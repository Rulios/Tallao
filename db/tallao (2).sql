-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2020 a las 05:43:49
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tallao`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `targetmarket`
--

CREATE TABLE `targetmarket` (
  `id` int(11) NOT NULL,
  `reason` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `targetmarket`
--

INSERT INTO `targetmarket` (`id`, `reason`) VALUES
(1, 'internet-advertisement'),
(2, 'internet-advertisement'),
(3, 'internet-advertisement'),
(4, 'internet-advertisement'),
(5, 'internet-advertisement'),
(6, 'Escoge una opción'),
(7, 'Escoge una opción'),
(8, 'Escoge una opción'),
(9, 'none'),
(10, 'none'),
(11, 'none'),
(12, 'none'),
(13, 'social-media'),
(14, 'internet-advertisement'),
(15, 'real-advertisement'),
(16, 'internet-advertisement'),
(17, 'internet-advertisement'),
(18, ''),
(19, ''),
(20, ''),
(21, ''),
(22, ''),
(23, 'social-media'),
(24, 'internet-advertisement');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` text NOT NULL,
  `hashcode` text NOT NULL,
  `name` text NOT NULL,
  `lastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `orders` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='MAIN';

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `hashcode`, `name`, `lastname`, `email`, `password`, `orders`) VALUES
('OEO44', 'cTiBJT3JEWMVzL8c0NvX', 'Robert', 'Lu zheng', 'robert_lu20@hotmail.com', '$2y$12$nDuRZaYR59RDWtpa2WmI6OHw3JcJKKexjeE.xUVnYCPTEiODFIf3C', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `targetmarket`
--
ALTER TABLE `targetmarket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
