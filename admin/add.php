<?php
include '../includes/db.php';

if (isset($_POST['submit'])) {
  $title = $_POST['title'];
  $desc = $_POST['description'];
  $tags = $_POST['tags'];
  $category = $_POST['category'];

  // Image Upload
  $image = $_FILES['image']['name'];
  $target = "../uploads/" . basename($image);
  move_uploaded_file($_FILES['image']['tmp_name'], $target);

  $sql = "INSERT INTO portfolio_items (title, description, tags, category, image_path)
          VALUES ('$title', '$desc', '$tags', '$category', '$target')";

  mysqli_query($conn, $sql);
  echo "<script>alert('Portfolio item added successfully!');</script>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add Portfolio Item</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      max-width: 600px;
      margin: auto;
    }
    input, textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
    }
    button {
      padding: 10px 20px;
      background-color: #0077ff;
      border: none;
      color: white;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <h2>Add Portfolio Item</h2>

  <form action="add.php" method="POST" enctype="multipart/form-data">
    <label>Title:</label>
    <input type="text" name="title" required>

    <label>Description:</label>
    <textarea name="description" rows="4"></textarea>

    <label>Tags (comma separated):</label>
    <input type="text" name="tags">

    <label>Category:</label>
    <input type="text" name="category">

    <label>Upload Image:</label>
    <input type="file" name="image" accept="image/*" required>

    <button type="submit" name="submit">Add Item</button>
  </form>

</body>
</html>
