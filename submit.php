/* ================= submit.php (SECURE VERSION) ================= */
<?php
$conn = new mysqli("localhost", "root", "", "gym_db");

if ($conn->connect_error) {
  die("Connection failed");
}

// validation
$name = trim($_POST['name']);
$email = trim($_POST['email']);

if (empty($name) || empty($email)) {
  die("All fields required");
}

// prepared statement (secure)
$stmt = $conn->prepare("INSERT INTO users (name, email) VALUES (?, ?)");
$stmt->bind_param("ss", $name, $email);

if ($stmt->execute()) {
  echo "Registration Successful";
} else {
  echo "Error";
}

$stmt->close();
$conn->close();
?>