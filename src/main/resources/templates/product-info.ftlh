<!DOCTYPE html>
<html>
<head>
    <title>MyProducts</title>
</head>
<body>
<h1>${product.name}</h1><hr>
<h4>Подробная информация о продукте</h4>
<#if product.image?has_content>
 <img src="/images/${product.image.id?c}" height="60px"/><br><br>
<#else>
    <p>Добавить изображение:</p>
    <form action="/product/${product.id}/upload" method="post" enctype="multipart/form-data">
        <input type="file" id="file" name="file"><br><br>
        <input type="submit" value="Загрузить"><br><br>
    </form>
</#if>
<b>Количество калорий(на 100г): </b>${product.calories}<br>
<b>Белки(на 100г): </b>${product.proteins}<br>
<b>Жиры(на 100г): </b>${product.fats}<br>
<b>Углеводы(на 100г): </b>${product.carbohydrates}<br>

<hr>
<h3>Удалить продукт</h3>
<form action="/product/delete/${product.id?c}" method="post">
    <input type="submit" value="Удалить продукт"/>
</form>
</body>
</html>