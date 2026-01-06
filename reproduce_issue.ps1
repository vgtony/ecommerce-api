$ErrorActionPreference = "Stop"

# 1. Register
Write-Host "Registering user..."
$registerBody = @{
    firstname = "Test"
    lastname = "User"
    email = "test_repro@example.com"
    password = "password"
    role = "ADMIN"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/register" -Method Post -Body $registerBody -ContentType "application/json"
    Write-Host "Registration successful: $($registerResponse.token)"
} catch {
    Write-Host "Registration failed: $_"
}

# 2. Authenticate (Login)
Write-Host "`nAuthenticating..."
$authBody = @{
    email = "test_repro@example.com"
    password = "password"
} | ConvertTo-Json

try {
    $authResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/authenticate" -Method Post -Body $authBody -ContentType "application/json"
    $token = $authResponse.token
    Write-Host "Authentication successful. Token: $token"
} catch {
    Write-Host "Authentication failed: $_"
    exit 1
}

# 3. Create Product
Write-Host "`nCreating Product..."
$productBody = @{
    name = "Test Product"
    description = "A product for testing"
    price = 99.99
} | ConvertTo-Json

$headers = @{
    Authorization = "Bearer $token"
}

try {
    $productResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/products" -Method Post -Body $productBody -ContentType "application/json" -Headers $headers
    Write-Host "Product created successfully!"
    Write-Host ($productResponse | ConvertTo-Json)
} catch {
    Write-Host "Product creation failed: $_"
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response Body: $($reader.ReadToEnd())"
    }
}

# 4. Place Order
Write-Host "`nPlacing Order..."
$orderBody = @{
    items = @(
        @{
            productId = 1
            quantity = 2
        }
    )
} | ConvertTo-Json -Depth 3

try {
    $orderResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders" -Method Post -Body $orderBody -ContentType "application/json" -Headers $headers
    Write-Host "Order placed successfully!"
    Write-Host ($orderResponse)
} catch {
    Write-Host "Order placement failed: $_"
    if ($_.Exception.Response) {
        Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Host "Response Body: $($reader.ReadToEnd())"
    }
}
