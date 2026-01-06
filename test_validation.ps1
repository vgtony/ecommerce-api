$ErrorActionPreference = "Stop"

function Test-Endpoint {
    param (
        [string]$Uri,
        [string]$Method = "Post",
        [hashtable]$Body,
        [hashtable]$Headers = @{},
        [string]$Description
    )

    Write-Host "Testing: $Description"
    try {
        $jsonBody = $Body | ConvertTo-Json -Depth 5
        Invoke-RestMethod -Uri $Uri -Method $Method -Body $jsonBody -ContentType "application/json" -Headers $Headers
        Write-Host "❌ Failed: Request should have been rejected." -ForegroundColor Red
    } catch {
        if ($_.Exception.Response.StatusCode -eq [System.Net.HttpStatusCode]::BadRequest) {
            Write-Host "✅ Passed: Gets 400 Bad Request as expected." -ForegroundColor Green
        } else {
            Write-Host "❌ Failed: Expected 400 but got $($_.Exception.Response.StatusCode)" -ForegroundColor Red
            Write-Host "Response Body: $($_.Exception.Response.GetResponseStream() | ForEach-Object { (New-Object System.IO.StreamReader($_)).ReadToEnd() })"
        }
    }
}

# 1. Invalid Registration
Test-Endpoint -Uri "http://localhost:8080/api/v1/auth/register" -Body @{
    firstname = ""
    lastname = "User"
    email = "invalid-email"
    password = "123" # Too short
} -Description "Invalid Registration (empty name, invalid email, short password)"

# 2. Login to get token (for subsequent tests)
Write-Host "`nGetting token..."
try {
    # Register a valid user first
    try {
        Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/register" -Method Post -Body (@{
            firstname = "Valid"
            lastname = "User"
            email = "valid@example.com"
            password = "password123"
        } | ConvertTo-Json) -ContentType "application/json" | Out-Null
    } catch {}

    $token = (Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/authenticate" -Method Post -Body (@{
        email = "valid@example.com"
        password = "password123"
    } | ConvertTo-Json) -ContentType "application/json").token
    Write-Host "Token obtained."
} catch {
    Write-Host "Failed to get token: $_"
    exit 1
}

$headers = @{ Authorization = "Bearer $token" }

# 3. Invalid Product
Test-Endpoint -Uri "http://localhost:8080/api/v1/products" -Headers $headers -Body @{
    name = ""
    price = -10.00
    categoryId = $null
} -Description "Invalid Product (empty name, negative price, null category)"

# 4. Invalid Order
Test-Endpoint -Uri "http://localhost:8080/api/v1/orders" -Headers $headers -Body @{
    items = @()
} -Description "Invalid Order (empty items list)"
