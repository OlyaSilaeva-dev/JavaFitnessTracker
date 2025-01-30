<!DOCTYPE html>
<html>
<head>
    <title>MyExercises</title>
</head>
<body>
<h1>Exercises</h1><hr>
<h4>Упражнения</h4>
<form action="/exercise" method="get">
    Поиск по названию упражнения: <input type="text" name="name"><br>
    <input type="submit" value="Поиск">
</form>
<#list exercises as exercise>
    <div>
        <p><b>${exercise.name}</b> | <a href="/exercise/${exercise.id?c}">Подробнее...</a></p>
    </div>
    <#else>
    <h3>Упражнений нет</h3>
</#list>
<hr>
<h3>Создать новое упражнение</h3>
<form action="/exercise/create" method="post" enctype="multipart/form-data">
    Название упражнения: <label>
        <input type="text" name="name"/>
    </label><br><br>
    Интенсивность:
    <label>
        <select name="intensity">
            <option value="LIGHT">LIGHT</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
        </select>
    </label><br><br>
    Количество калорий в час: <input type="number" name="calories" step="any"/><br><br>
    Фотография: <input type="file" name="file"/><br><br>
    <input type="submit" value="Добавить упражнение"/>
</form>
</body>
</html>