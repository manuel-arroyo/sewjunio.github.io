<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Productos</title>
    <link rel="icon" type="image/x-icon" href="/sewjunio.github.io/public/img/logo/fav_ico.ico">

    <!-- Css imports-->
    <link rel="stylesheet" type="text/css" href="/sewjunio.github.io/css/main.css">
    <link rel="stylesheet" type="text/css" href="/sewjunio.github.io/css/products.css">

    <!-- Js Imports-->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="/sewjunio.github.io/js/products.js"></script>
    <script src="/sewjunio.github.io/js/session.js"></script>
    <script src="/sewjunio.github.io/js/util.js"></script>
</head>

<body>
    <header>
        <nav>
            <ul>
                <li>
                    <a href="/sewjunio.github.io/html/html/index.html">
                        <img src="/sewjunio.github.io/public/img/logo/main_logo.png" alt="LOWERCASE Logo">
                    </a>
                </li>
                <li>
                    <a href="/sewjunio.github.io/html/html/index.html">
                        Inicio
                    </a>
                    <hr>
                </li>
                <li>
                    <a href="/sewjunio.github.io/html/sewjunio.github.io/php/view_products.php">
                        Tienda
                    </a>
                    <hr>
                </li>
                <li>
                    <a href="/sewjunio.github.io/html/html/contact.html">
                        Contacto
                    </a>
                    <hr>
                </li>
                <li>
                    <a href="/sewjunio.github.io/html/html/switches.html">
                        Switches
                    </a>
                    <hr>
                </li>
        
                     

                <li>
                    <a href="/sewjunio.github.io/html/html/register.html">
                        Registrarse
                    </a>
                    <hr>
                </li> 
                <li>
                    <a href="/sewjunio.github.io/html/html/login.html">
                        Iniciar Sesión
                    </a>
                    <hr>
                </li>
                <li>
                    <a href="/sewjunio.github.io/html/html/cart.html">
                        <img src="/sewjunio.github.io/public/img/icons/carrito-de-compras.png" alt="Carrito">
                    </a>
                </li>
            </ul>   
        </nav>
    </header>

    <main>
        <section>
            <h1>Lista de Productos</h1>
            <hr>
        </section>


        <?php
        include("config.php");

        $db = new Database();
        $db -> connect_db();
        
        // Consulta de los productos
        $query = "SELECT * FROM products ORDER BY id DESC";

        if ($result = $db ->con->query($query)) {
            while($row = $result -> fetch_object()) {
                echo '<section>';
                echo '  <img src="'.$row->img_link.'" alt="Image of '.$row->name.'">';
                echo '  <h2>'.$row->name.'</h2>';  
                echo '  <p>'.$row->price.' €</p>'; 
                echo '  <label for="cantidad_'.$row->id.'">Cantidad:</label>';
                echo '  <input type="number" id="cantidad_'.$row->id.'" name="cantidad" value="1" min="0" max="10">';
                echo '  <button name="buy"  onclick="products.addToCart('.$row->id.')">Añadir al Carrito</button>';
                echo '  <p hidden id="'.$row->id.'">';                
                echo '</section>';
            }        
            $result -> free_result();
        }

        $db -> close_db();
       
        ?>
    </main>

    <footer>
        <hr>
        <ul>
            <li>
                <p>Por Manuel Arroyo García</p>
                <p>Escuela de Ingenieria Informática</p>
                <p>Oviedo - Mayo 2022</p>
            </li>
            <li>
                <a href="https://validator.w3.org/check?uri=referer">
                    <img src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png"
                    alt=" HTML5 Válido!">
                </a>
            </li>
            <li>
                <p>
                    <a href="http://jigsaw.w3.org/css-validator/check/referer">
                        <img src="http://jigsaw.w3.org/css-validator/images/vcss"
                        alt="¡CSS Válido!" />
                    </a>
                </p>

                <p>
                    <a href="http://jigsaw.w3.org/css-validator/check/referer">
                        <img src="http://jigsaw.w3.org/css-validator/images/vcss-blue"
                        alt="¡CSS Válido!" />
                    </a>
                </p>
            </li>
        </ul>
    </footer>
</body>

</html>