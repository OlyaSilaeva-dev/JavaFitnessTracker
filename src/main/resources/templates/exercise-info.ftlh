<!DOCTYPE html>
<html>
<head>
    <title>MyExercises</title>
</head>
<body>
<h1>${exercise.name}</h1><hr>
<h4>Подробная информация об упражнении</h4>
<#if exercise.image?has_content>
    <img src="/images/${exercise.image.id?c}" height="60px"/><br><br>
<#else>
    <p>Добавить изображение:</p>
    <form action="/exercise/${exercise.id}/upload" method="post" enctype="multipart/form-data">
        <input type="file" id="file" name="file"><br><br>
        <input type="submit" value="Загрузить"><br><br>
    </form>
</#if>

<b>Интенсивность: </b>${exercise.intensity}<br>
<b>Количество калорий в час: </b>${exercise.calories}<br>

<hr>
<h3>Удалить упражнение</h3>
<form action="/exercise/delete/${exercise.id?c}" method="post">
    <input type="submit" value="Удалить упражнение"/>
</form>
</body>
</html>