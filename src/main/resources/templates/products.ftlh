<!DOCTYPE html>
<html>
<head>
    <title>MyProducts</title>
</head>
<body>
<h1>Products</h1><hr>
<h4>Продукты</h4>
<form action="/product" method="get">
    Поиск по названию продукта: <input type="text" name="name"><br>
    <input type="submit" value="Поиск">
</form>
<#list products as product>
    <div>
        <p><b>${product.name}</b> | <a href="/product/${product.id?c}">Подробнее...</a></p>
    </div>
    <#else>
        <h3>Продуктов нет</h3>
</#list>
<hr>
<h3>Создать новый продукт</h3>
<form action="/product/create" method="post" enctype="multipart/form-data">
    Название товара: <input type="text" name="name"/><br><br>
    Количество калорий(на 100г): <input type="number" name="calories" step="any"/><br><br>
    Белки(на 100г): <input type="number" name="proteins" step="0.01"/><br><br>
    Жиры(на 100г): <input type="number" name="fats" step="0.01"/><br><br>
    Углеводы(на 100г): <input type="number" name="carbohydrates" step="0.01"/><br><br>
    Фотография: <input type="file" name="file"/><br><br>
    <input type="submit" value="Добавить продукт"/>
</form>
</body>
</html>