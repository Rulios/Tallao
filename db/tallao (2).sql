-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2020 a las 04:24:06
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
-- Estructura de tabla para la tabla `superusers`
--

CREATE TABLE `superusers` (
  `initials` text NOT NULL,
  `hashcode` text NOT NULL,
  `laundryname` text NOT NULL,
  `location` text NOT NULL,
  `serviceoffer` text NOT NULL,
  `legalreprName` text NOT NULL,
  `legalreprLastname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `superusers`
--

INSERT INTO `superusers` (`initials`, `hashcode`, `laundryname`, `location`, `serviceoffer`, `legalreprName`, `legalreprLastname`, `email`, `password`) VALUES
('VICNT', 'v9GopsZk5g83aDxJLOTy', 'Lavandería Vicente', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$VIrp1mNZyJdClm5W1.Hu5eM0qk7H7LPcv.dvjZSgUXRpVNfZ1RN7q'),
('VCN2', 'uKvlLBkofg8mDXdTE0LZ', 'Lavandería Vicente #2', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', 'Dogo ', 'Goa ', 'robert_lu20@hotmail.com', '$2y$12$YRSPvksgzPmKIfIGmrBMTesbVNy2OXf.bBVHP5gvJB.ZdlfuoXDru'),
('VICN3', '6qJQcODaSeQZPYtiDTeb', 'Lavandería Vicente #3', 'Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago', '', 'Robert ', 'Lu Zheng ', 'pero@wachu.com', '$2y$12$N8lgkzoCpSlGwGSWl3b/EON8yI1TwQGmG8Hiz5BjsgtNcpGjIhdSm');

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
(24, 'internet-advertisement'),
(25, 'people-recommendation'),
(26, ''),
(27, ''),
(28, ''),
(29, ''),
(30, ''),
(31, ''),
(32, ''),
(33, ''),
(34, ''),
(35, ''),
(36, 'social-media'),
(37, 'internet-advertisement');

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
('GUQ13', 'QTEBQqu9zz5G9e8Ir9DC', 'Robert ', 'Lu Zheng ', 'wardinpro123@gmail.com', '$2y$12$v61fhL2sZcS5JU4ZOROaAud1tMDJJQZGUPH.MZCIAVIP1QiTtCWuC', 0);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
