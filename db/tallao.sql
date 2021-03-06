--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

-- Started on 2021-02-07 00:15:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 204 (class 1259 OID 16479)
-- Name: custom_messages; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.custom_messages (
    laundry_initials character varying(6) NOT NULL,
    id character varying(50) NOT NULL,
    color_tag character varying(50) DEFAULT '#696B65'::character varying NOT NULL,
    tag text NOT NULL,
    message text NOT NULL
);


ALTER TABLE public.custom_messages OWNER TO rober;

--
-- TOC entry 212 (class 1259 OID 33081)
-- Name: feedback; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.feedback (
    id integer NOT NULL,
    comment text,
    created_at timestamp with time zone
);


ALTER TABLE public.feedback OWNER TO rober;

--
-- TOC entry 211 (class 1259 OID 33079)
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: rober
--

CREATE SEQUENCE public.feedback_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.feedback_id_seq OWNER TO rober;

--
-- TOC entry 3098 (class 0 OID 0)
-- Dependencies: 211
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rober
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- TOC entry 203 (class 1259 OID 16470)
-- Name: last_order_id; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.last_order_id (
    laundry_initials character varying(6) NOT NULL,
    id_char character varying(50) NOT NULL,
    id_number integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.last_order_id OWNER TO rober;

--
-- TOC entry 201 (class 1259 OID 16417)
-- Name: laundries; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.laundries (
    initials character varying(6) NOT NULL,
    hashcode character varying(100) NOT NULL,
    name text NOT NULL,
    location text,
    schedule json DEFAULT '{"monday":{"startHour":"","endHour":""},"tuesday":{"startHour":"","endHour":""},"wednesday":{"startHour":"","endHour":""},"thursday":{"startHour":"","endHour":""},"friday":{"startHour":"","endHour":""},"saturday":{"startHour":"","endHour":""},"sunday":{"startHour":"","endHour":""}}'::json,
    serviceoffer text[] DEFAULT '{iron,wash_iron,wash,dry_clean}'::text[],
    legalreprname text NOT NULL,
    legalreprsurname text NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.laundries OWNER TO rober;

--
-- TOC entry 210 (class 1259 OID 33058)
-- Name: notifications_for_laundries; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.notifications_for_laundries (
    id character varying(100) NOT NULL,
    emitter character varying(20) NOT NULL,
    getter character varying(20) NOT NULL,
    code character varying(50) NOT NULL,
    extras jsonb,
    getter_has_viewed boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.notifications_for_laundries OWNER TO rober;

--
-- TOC entry 209 (class 1259 OID 24886)
-- Name: notifications_for_users; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.notifications_for_users (
    id character varying(100) DEFAULT ''::character varying NOT NULL,
    emitter character varying(20) NOT NULL,
    getter character varying(20) NOT NULL,
    code character varying(50) NOT NULL,
    extras jsonb,
    getter_has_viewed boolean DEFAULT false,
    created_at timestamp with time zone
);


ALTER TABLE public.notifications_for_users OWNER TO rober;

--
-- TOC entry 205 (class 1259 OID 16492)
-- Name: orders; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.orders (
    laundry_initials character varying(6) NOT NULL,
    customer_id character varying(6),
    customer_name text,
    id character varying(50) NOT NULL,
    id_char character varying(50) DEFAULT ''::character varying NOT NULL,
    id_number integer NOT NULL,
    status text DEFAULT 'wait'::text NOT NULL,
    elements_details json NOT NULL,
    hook_quantity integer DEFAULT 0 NOT NULL,
    date_receive timestamp with time zone NOT NULL,
    date_assign timestamp with time zone NOT NULL,
    total_price numeric(10,2) NOT NULL,
    indications text,
    CONSTRAINT positive_number CHECK (((hook_quantity >= 0) AND (total_price > (0)::numeric)))
);


ALTER TABLE public.orders OWNER TO rober;

--
-- TOC entry 202 (class 1259 OID 16440)
-- Name: price_chart; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.price_chart (
    laundry_initials character varying(6) NOT NULL,
    iron json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    wash_iron json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    wash json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    dry_clean json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    extras json DEFAULT '{"hook":0}'::json NOT NULL
);


ALTER TABLE public.price_chart OWNER TO rober;

--
-- TOC entry 207 (class 1259 OID 16605)
-- Name: target_market; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.target_market (
    id integer NOT NULL,
    reason character varying(50)
);


ALTER TABLE public.target_market OWNER TO rober;

--
-- TOC entry 206 (class 1259 OID 16603)
-- Name: target_market_id_seq; Type: SEQUENCE; Schema: public; Owner: rober
--

CREATE SEQUENCE public.target_market_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.target_market_id_seq OWNER TO rober;

--
-- TOC entry 3099 (class 0 OID 0)
-- Dependencies: 206
-- Name: target_market_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rober
--

ALTER SEQUENCE public.target_market_id_seq OWNED BY public.target_market.id;


--
-- TOC entry 200 (class 1259 OID 16405)
-- Name: users; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.users (
    public_id character varying(6) NOT NULL,
    hashcode character varying(100) NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    verified boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO rober;

--
-- TOC entry 208 (class 1259 OID 24846)
-- Name: verification_tokens; Type: TABLE; Schema: public; Owner: rober
--

CREATE TABLE public.verification_tokens (
    hashcode character varying(100) NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.verification_tokens OWNER TO rober;

--
-- TOC entry 2919 (class 2604 OID 33084)
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- TOC entry 2915 (class 2604 OID 16608)
-- Name: target_market id; Type: DEFAULT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.target_market ALTER COLUMN id SET DEFAULT nextval('public.target_market_id_seq'::regclass);


--
-- TOC entry 3084 (class 0 OID 16479)
-- Dependencies: 204
-- Data for Name: custom_messages; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.custom_messages (laundry_initials, id, color_tag, tag, message) FROM stdin;
CAMINO	CAMINO-am7nbgskihrxtsz	#E6D1DC	Sin pliegue | 不折	Sin pliegue | 不折
PLAC	PLAC-am7n7qokizje45q	#E6D1DC	Sin pliegue | 不折	Sin pliegue | 不折
DAOG	DAOG-am7nb9wkjf5bdez	#E6D1DC	Sin pliegue | 不折	Sin pliegue | 不折
VICAT	VICAT-am7n7l4kjgo0860	#E6D1DC	Sin pliegue | 不折	Sin pliegue | 不折
VICNT	VICNT-am7np4khpq2o7v	#E6D1DC	Sin pliegue | 不折	Sin pliegue | 不折
VICNT	VICNT-am7n8pokig2qqqh	#be1313	Proyyecgdadw	Prosadadd
VICNT	VICNT-am7n8d0kikf5map	#2afe54	Yeyesada	Prrrrrr
VICNT	VICNT-am7nhkskkszpr7i	#430f0f	xopaaaa	dawd
\.


--
-- TOC entry 3092 (class 0 OID 33081)
-- Dependencies: 212
-- Data for Name: feedback; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.feedback (id, comment, created_at) FROM stdin;
3	dadadadad	2021-01-05 22:56:00-05
\.


--
-- TOC entry 3083 (class 0 OID 16470)
-- Dependencies: 203
-- Data for Name: last_order_id; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.last_order_id (laundry_initials, id_char, id_number) FROM stdin;
VICAT	A	1
CAMINO	A	0
PLAC	A	0
VICNT	A	93
DAOG	A	0
\.


--
-- TOC entry 3081 (class 0 OID 16417)
-- Dependencies: 201
-- Data for Name: laundries; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.laundries (initials, hashcode, name, location, schedule, serviceoffer, legalreprname, legalreprsurname, email, password) FROM stdin;
PLAC	45088ce6-e29a-4e4f-b9f1-6c849b945676	Lavandería Los Caobos	Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago	{"monday":{"startHour":"","endHour":""},"tuesday":{"startHour":"","endHour":""},"wednesday":{"startHour":"","endHour":""},"thursday":{"startHour":"","endHour":""},"friday":{"startHour":"","endHour":""},"saturday":{"startHour":"","endHour":""},"sunday":{"startHour":"","endHour":""}}	{iron,wash_iron,wash,dry_clean}	Yeyo	Clack	yeyo@clack.com	$2b$10$tA8G9MLW7Q2lynfBU2cDgesjZOqo7dVgMczFFZN9tA3nsgrCtZppa
DAOG	c3a7fce0-0595-4163-b904-1feec2dd8cc8	Lavandería Los Caminos	Panamá, Panamá,<script>alert("hola")</script> Juan Díaz, Entrada de Villa Catalina, Edifico Santiago	{"monday":{"startHour":"","endHour":""},"tuesday":{"startHour":"","endHour":""},"wednesday":{"startHour":"","endHour":""},"thursday":{"startHour":"","endHour":""},"friday":{"startHour":"","endHour":""},"saturday":{"startHour":"","endHour":""},"sunday":{"startHour":"","endHour":""}}	{iron,wash_iron,wash,dry_clean}	Robert	Zheng	yeyo1@clack.com	$2b$10$hc5cCTcMn4F6cMbUGjo6i.zFY2jGqKsjkfOS2GiTRgvAHJyrDaaUe
CAMINO	bb316e24-3d6b-4477-91b5-8513b11507f9	Lavandería Vicente #3	Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago	{"monday":{"startHour":"","endHour":""},"tuesday":{"startHour":"","endHour":""},"wednesday":{"startHour":"","endHour":""},"thursday":{"startHour":"","endHour":""},"friday":{"startHour":"","endHour":""},"saturday":{"startHour":"","endHour":""},"sunday":{"startHour":"","endHour":""}}	{iron,wash_iron,wash,dry_clean}	Robert	Zheng	robert.lu@utp.ac.pa	$2b$10$UxIZe71Wt6DuqZwJBhyad.orFCtsZnpP3OQEo6d0Iw61M1b7TuuwW
VICAT	3853f682-5294-4573-a3fb-4f0f54e52fe2	Lavandería Vicente	Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago	{"monday":{"startHour":"","endHour":""},"tuesday":{"startHour":"","endHour":""},"wednesday":{"startHour":"","endHour":""},"thursday":{"startHour":"","endHour":""},"friday":{"startHour":"","endHour":""},"saturday":{"startHour":"","endHour":""},"sunday":{"startHour":"","endHour":""}}	{iron,wash_iron,wash,dry_clean}	Robert	Lu Zheng	robert_lu20@hotmail.com	$2b$10$JzkcsiAS/sKc/SyaLk980.X3xFmi5Yscs04TpN6AIp8.kAm8LgfGy
VICNT	31406f90-aa9d-4fc8-9767-0efd5728b8b6	Lavandería Vicente	Panamá, Panamá, Juan Díaz, Entrada de Villa Catalina, Edifico Santiago	{"monday":{"startHour":"12:56","endHour":"00:56"},"tuesday":{"startHour":"00:56","endHour":"12:06"},"wednesday":{"startHour":"00:56","endHour":"12:56"},"thursday":{"startHour":"00:56","endHour":"12:56"},"friday":{"startHour":"00:03","endHour":"12:56"},"saturday":{"startHour":"00:59","endHour":"12:56"},"sunday":{"startHour":"12:56","endHour":"12:01"}}	{wash_iron,iron,wash,dry_clean}	Robert 	Zheng 	wardinpro123@gmail.com	$2b$10$reWJ.4nm1OsURN.6.LO6GeFh1vUzTJB5rWeiaMNtBXHNMDnX4loOm
\.


--
-- TOC entry 3090 (class 0 OID 33058)
-- Dependencies: 210
-- Data for Name: notifications_for_laundries; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.notifications_for_laundries (id, emitter, getter, code, extras, getter_has_viewed, created_at) FROM stdin;
\.


--
-- TOC entry 3089 (class 0 OID 24886)
-- Dependencies: 209
-- Data for Name: notifications_for_users; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.notifications_for_users (id, emitter, getter, code, extras, getter_has_viewed, created_at) FROM stdin;
VICNT-f2766fd4-3a84-4cd6-ba3c-229f7a6456d8-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 60, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:33:37-05
VICNT-6d122b9d-d420-419d-ab1f-985dddcc3e2b-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 61, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:33:43-05
VICNT-309be049-79c6-41d3-bd6b-81869686df41-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 60, "laundryName": "Lavandería Vicente"}	t	2021-01-11 23:42:08-05
VICAT-bdfb3a46-54fd-43e8-bbed-9494e7ed2117-GUQ13	VICAT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-12 00:09:22-05
VICNT-db89484a-2a23-490e-97ff-cc03c15b75cb-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-30 01:22:18-05
VICNT-c2738027-4780-4bcf-bba1-13e12e927065-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 00:30:57-05
VICNT-1f0b208a-b27b-4c98-b09a-207df4149624-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-11 22:12:56-05
VICNT-6184c513-4d3f-4d1f-8a53-6b5e98b7eebd-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 59, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:16:01-05
VICNT-4e97b11f-8f3d-419e-bacb-567a62d46df1-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 59, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:16:13-05
VICNT-2ece89c5-b53f-4a82-a1f1-ffdfad1e16b6-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 59, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:16:26-05
VICNT-bb17b23a-517b-4a92-b4e5-09c91db233e0-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 58, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:16:36-05
VICNT-e7ce8cff-e3ab-4cfa-bd6b-291a6bd3f471-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-11 22:29:58-05
VICNT-21e3ef06-447f-4482-a215-eef021a08aad-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 58, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:32:15-05
VICNT-bdeb8295-8359-46d5-94a4-4b7e65c35e90-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 60, "laundryName": "Lavandería Vicente"}	t	2021-01-11 22:32:21-05
VICNT-d1ef6b8b-d690-4e76-9a21-205cc1858be2-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-11 22:33:20-05
VICNT-81841193-d1ad-4c8e-9e26-9b40db1e5326-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 01:05:24-05
VICNT-74cd985e-2c26-4d88-bde8-2ec71c1a4a5d-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 01:07:07-05
VICNT-eca7c933-556e-4492-be45-a124aa25383f-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 01:08:51-05
VICNT-3229309c-9ee4-4644-9425-ac97d9f3a8b5-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 01:09:14-05
VICNT-62ce78e7-3574-4066-9064-2c2ba89d9395-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 19:36:55-05
VICNT-384b3305-40e8-4069-87a7-e00148283900-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 19:37:13-05
VICNT-0c268525-1fc3-46b7-aae2-c740386865f1-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 19:37:34-05
VICNT-d565bdde-f5e2-4b9a-a430-875ee2194474-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-01-31 19:37:52-05
VICNT-142689eb-d0d3-4649-a268-f8f4913ca98a-NULL	VICNT	NULL	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 62, "laundryName": "Lavandería Vicente"}	f	2021-02-04 19:44:12-05
VICNT-0e189f28-0aea-4f99-bca1-8ec21b6a2ef4-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-30 01:23:57-05
VICNT-4f0aca88-3617-4ecd-9c01-0c873afb7ed4-NULL	VICNT	NULL	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 62, "laundryName": "Lavandería Vicente"}	f	2021-02-04 19:56:33-05
VICNT-f6844536-f201-48c2-9c83-0a264c379e0f-NULL	VICNT	NULL	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 62, "laundryName": "Lavandería Vicente"}	f	2021-02-04 20:08:51-05
VICNT-5ff58b58-2ad2-48e7-a947-a43c55533dd6-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-02-04 23:41:45-05
VICNT-d6a67160-9b91-439b-aafa-7bd487770ff3-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-02-04 23:42:32-05
VICNT-d6c78ff5-7b2b-41ef-a0e3-2da714de9df7-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-02-04 23:43:41-05
VICNT-c437defc-7d04-4280-be5e-4ef08dfb0b5a-NULL	VICNT	NULL	new-order	{"laundryName": "Lavandería Vicente"}	f	2021-02-04 23:53:43-05
VICNT-365f0072-ad33-439b-a4bf-9500aed01eea-BEBQ2	VICNT	BEBQ2	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-05 20:16:22-05
VICNT-67a117c1-ffab-47eb-8112-95505c032a0c-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 00:26:03-05
VICNT-10e9e71e-d744-47e3-ac8e-ef8b4b89c73a-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 00:27:02-05
VICNT-0b798941-f7e9-486d-912d-f1ae9c7afa14-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 00:27:48-05
VICNT-0db58d3a-8d77-4c3a-8c31-73833e4bcafd-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 00:46:57-05
VICNT-3a984549-6f6a-4f39-899b-ed8efc208f7f-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 00:47:56-05
VICNT-fcaf36b7-e235-44bd-8e29-0072e6b75bb8-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 01:02:50-05
VICNT-e2b6cd8f-6978-476b-a0d6-c634fdd87cec-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 01:03:49-05
VICNT-bc8676d6-2a0f-4258-ab77-afdb9b3d3e5b-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 19:34:54-05
VICNT-6268108a-dffe-4545-8946-7a0f09587981-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 19:38:27-05
VICNT-1dc5c65f-c993-4f59-be8f-ae531d2854cc-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-01-31 19:45:54-05
VICNT-9af82108-90c0-4dbf-ab48-4f4c3056f807-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 22:19:00-05
VICNT-454893e3-95ab-4b0e-81a9-ab12cd6b0543-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 22:23:08-05
VICNT-e7b6391d-352d-41a0-9676-2f369921cada-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 22:24:15-05
VICNT-60c8e949-56a7-47c6-b06e-7cff8df55032-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 23:05:46-05
VICNT-16026801-f080-41a9-9b12-a4b7ebb3b1b5-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 23:07:10-05
VICNT-61584b01-7062-41a5-9744-ce8718e9b56a-GUQ13	VICNT	GUQ13	new-order	{"laundryName": "Lavandería Vicente"}	t	2021-02-01 23:32:19-05
VICNT-57d4de97-51d8-4b72-bc99-5f62c7d50094-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 19:48:44-05
VICNT-5300244e-61a1-43e5-b2a6-e0084e143bf6-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 19:50:51-05
VICNT-c3c37c3a-72cc-4bc5-a46a-dd939b9d33b1-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 19:52:25-05
VICNT-8357305f-c91d-4a45-9b90-a9476fb7306f-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 19:57:03-05
VICNT-e1e3e633-1881-44f5-b936-9ebb23d8af78-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:03:57-05
VICNT-a420f2e0-5b11-4ce1-bdb5-188419d3f8af-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:04:57-05
VICNT-7344dd4c-cd9b-4f79-9975-1c22801e365a-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:07:52-05
VICNT-207f5564-6c40-4604-b034-af6f8fa20ae5-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:15:24-05
VICNT-e953298a-8a60-47bf-915b-078e89f633d8-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:18:21-05
VICNT-b5f1f965-557d-46c2-bd7d-b6aa49292702-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 85, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:19:19-05
VICNT-685dc9e3-23df-4c50-b895-5beff9b5d02a-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 85, "laundryName": "Lavandería Vicente"}	t	2021-02-04 20:19:57-05
VICNT-6b260870-c856-44f1-b5bc-07866e24c171-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 85, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:48:19-05
VICNT-11ba3117-cb3d-4359-8274-3add65164c94-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 84, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:49:03-05
VICNT-64ed9d93-14c4-4af6-b706-db6d5c2422c5-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 84, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:49:24-05
VICNT-a11c2f3d-12be-41f0-8338-3f272a8c4d4b-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 85, "laundryName": "Lavandería Vicente"}	t	2021-02-04 23:18:52-05
VICNT-3ff6c601-3bb5-41cb-bc48-669a3c4e76ec-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 84, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:51:02-05
VICNT-1679a458-7b44-4a78-b38f-329cf40582af-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 83, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:52:18-05
VICNT-9722236a-bdca-42e3-8728-601ae7ff07c3-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 83, "laundryName": "Lavandería Vicente"}	t	2021-02-04 21:54:52-05
VICNT-47ef449c-2607-42cb-9abe-627d394eed8c-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 83, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:21:29-05
VICNT-de890786-4db2-4c95-95cb-f3ca8fc0e785-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 70, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:34:24-05
VICNT-6b1bb4f3-8a09-4d21-9a9d-46db83661e7e-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 70, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:34:35-05
VICNT-912c86a2-e010-48aa-b591-e61b709414b6-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:36:05-05
VICNT-2259bc19-7fe7-487c-82fb-85218efffdb5-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:36:14-05
VICNT-29f9449e-f879-4e10-b080-972696c29877-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 88, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:37:10-05
VICNT-00f2a68f-4818-4925-82e6-a46bfe102eda-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:48:33-05
VICNT-3333a0cc-afa4-46ad-86a8-449cb79e43c4-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:49:56-05
VICNT-1cd858f7-f392-44c6-8816-f1c6a0478891-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 87, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:51:53-05
VICNT-562c9642-663c-444b-a8a8-4301d8be072f-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:54:11-05
VICNT-a2026255-c274-48c6-8e97-699738d8b500-GUQ13	VICNT	GUQ13	new-order-status	{"status": "ready", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 22:55:17-05
VICNT-a1508654-5742-4c24-ac87-cb825c06856f-GUQ13	VICNT	GUQ13	new-order-status	{"status": "retired", "id_char": "A", "SUB_PROP": "status", "id_number": 86, "laundryName": "Lavandería Vicente"}	t	2021-02-04 23:18:40-05
VICNT-3f3fd205-592f-4735-9657-cc31942c479e-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 85, "laundryName": "Lavandería Vicente"}	t	2021-02-04 23:18:47-05
VICNT-643e5440-37c1-42fd-a129-db6523bf394c-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 84, "laundryName": "Lavandería Vicente"}	t	2021-02-04 23:18:59-05
VICNT-c2985af7-3d8b-4a67-a8db-8c055c588f2f-GUQ13	VICNT	GUQ13	new-order-status	{"status": "processing", "id_char": "A", "SUB_PROP": "status", "id_number": 89, "laundryName": "Lavandería Vicente"}	t	2021-02-04 23:57:53-05
\.


--
-- TOC entry 3085 (class 0 OID 16492)
-- Dependencies: 205
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.orders (laundry_initials, customer_id, customer_name, id, id_char, id_number, status, elements_details, hook_quantity, date_receive, date_assign, total_price, indications) FROM stdin;
VICNT	NULL	\N	VICNT-A36	A	36	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	2	2021-01-03 00:24:00-05	2021-01-03 00:30:00-05	3.65	Sin pliegue | 不折
VICNT	NULL	\N	VICNT-A45	A	45	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	2	2021-01-04 01:11:00-05	2021-01-04 01:17:00-05	3.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A56	A	56	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-09 21:40:00-05	2021-01-09 21:46:00-05	2.30	
VICNT	K9ECL	Robert Zheng	VICNT-A52	A	52	processing	{"overall":{"dry_clean":{"quantity":1,"price":1}},"jumper":{"dry_clean":{"quantity":1,"price":1}}}	2	2021-01-06 23:44:00-05	2021-01-06 23:50:00-05	2.00	Sin pliegue | 不折
VICNT	NULL	\N	VICNT-A62	A	62	retired	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-30 01:22:00-05	2021-02-02 01:21:00-05	1.50	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A50	A	50	ready	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-06 23:26:00-05	2021-01-06 23:32:00-05	2.30	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A59	A	59	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}}}	1	2021-01-11 22:12:00-05	2021-01-11 22:18:00-05	0.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A58	A	58	retired	{"pants":{"dry_clean":{"quantity":1,"price":1.65}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	2	2021-01-11 22:08:00-05	2021-01-11 22:13:00-05	3.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A70	A	70	ready	{"skirt":{"iron":{"quantity":1,"price":0.65}}}	5	2021-01-31 01:02:00-05	2021-02-01 01:08:00-05	0.65	Sin pliegue | 不折
VICNT	K9ECL	Robert Zheng	VICNT-A53	A	53	wait	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	3	2021-01-06 23:45:00-05	2021-01-06 23:51:00-05	4.30	Sin pliegue | 不折
VICNT	K9ECL	Robert Zheng	VICNT-A54	A	54	wait	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-06 23:49:00-05	2021-01-06 23:55:00-05	2.30	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A49	A	49	ready	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-04 19:17:00-05	2021-01-04 19:23:00-05	2.30	Sin pliegue | 不折
VICNT	K9ECL	Robert Zheng	VICNT-A51	A	51	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-06 23:42:00-05	2021-01-06 23:48:00-05	2.30	Prosada Prrrrrr
VICNT	GUQ13	Robert Zheng	VICNT-A57	A	57	ready	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}},"custom1":{"dry_clean":{"quantity":1,"price":1,"name":"Pollera"}}}	3	2021-01-09 23:05:00-05	2021-01-09 23:11:00-05	3.30	Prosada
VICNT	GUQ13	Robert Zheng	VICNT-A48	A	48	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-04 19:13:00-05	2021-01-04 19:19:00-05	2.30	Prrrrrr
VICNT	GUQ13	Robert Zheng	VICNT-A44	A	44	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-04 00:59:00-05	2021-01-04 01:59:00-05	2.30	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A47	A	47	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-04 01:15:00-05	2021-01-04 01:21:00-05	2.30	Prrrrrr
VICNT	GUQ13	Robert Zheng	VICNT-A55	A	55	retired	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-07 00:23:00-05	2021-01-07 00:29:00-05	1.65	Prosada Prrrrrr Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A61	A	61	processing	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-11 22:33:00-05	2021-01-11 22:39:00-05	1.65	Prrrrrr
VICNT	GUQ13	Robert Zheng	VICNT-A60	A	60	retired	{"shirt":{"dry_clean":{"quantity":1,"price":0.65}}}	1	2021-01-11 22:29:00-05	2021-01-11 22:35:00-05	0.65	Prrrrrr
VICAT	GUQ13	Robert Zheng	VICAT-A1	A	1	wait	{"shirt":{"iron":{"quantity":1,"price":1}}}	1	2021-01-12 00:09:00-05	2021-01-12 00:15:00-05	1.00	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A63	A	63	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-30 01:23:00-05	2021-03-31 01:23:00-04	1.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A64	A	64	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-31 00:26:00-05	2021-01-31 00:31:00-05	1.65	Yeyesadaddad
VICNT	GUQ13	Robert Zheng	VICNT-A65	A	65	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-31 00:27:00-05	2021-01-31 00:32:00-05	1.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A66	A	66	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-31 00:27:00-05	2021-03-02 00:33:00-05	1.65	Yeyesada
VICNT	NULL	\N	VICNT-A67	A	67	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 00:30:00-05	2021-01-31 00:33:00-05	1.50	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A68	A	68	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 00:46:00-05	2021-01-31 00:52:00-05	1.50	Proyyecgdadw
VICNT	GUQ13	Robert Zheng	VICNT-A69	A	69	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-31 00:47:00-05	2021-01-31 00:53:00-05	1.65	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A71	A	71	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}},"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	2	2021-01-31 01:03:00-05	2021-01-31 01:09:00-05	3.15	Proyyecgdadw dadwdd
VICNT	NULL	\N	VICNT-A72	A	72	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 01:05:00-05	2021-01-31 01:09:00-05	1.50	Yeyesada dadwddw
VICNT	NULL	\N	VICNT-A73	A	73	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 01:07:00-05	2021-01-31 01:12:00-05	1.50	Yeyesada
VICNT	NULL	\N	VICNT-A74	A	74	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}},"coat":{"dry_clean":{"quantity":1,"price":1}}}	2	2021-01-31 01:08:00-05	2021-01-31 01:14:00-05	2.65	dawd Proyyecgdadw
VICNT	NULL	\N	VICNT-A75	A	75	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	2	2021-01-31 01:09:00-05	2021-01-31 01:14:00-05	3.50	Proyyecgdadw
VICNT	GUQ13	Robert Zheng	VICNT-A76	A	76	wait	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-01-31 19:34:00-05	2021-01-31 19:39:00-05	1.65	dadawd
VICNT	NULL	\N	VICNT-A77	A	77	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 19:36:00-05	2021-01-31 19:42:00-05	1.50	Yeyesada
VICNT	NULL	\N	VICNT-A78	A	78	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}},"skirt":{"dry_clean":{"quantity":1,"price":2}}}	2	2021-01-31 19:37:00-05	2021-01-31 19:42:00-05	3.50	Proyyecgdadw
VICNT	NULL	\N	VICNT-A80	A	80	wait	{"shirt":{"iron":{"quantity":1,"price":0.65},"dry_clean":{"quantity":1,"price":1.5}}}	2	2021-01-31 19:37:00-05	2021-01-31 19:42:00-05	2.15	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A81	A	81	wait	{"skirt":{"dry_clean":{"quantity":1,"price":2}},"coat":{"dry_clean":{"quantity":1,"price":1}},"sweater":{"dry_clean":{"quantity":1,"price":0.65}},"pleatedSkirt":{"dry_clean":{"quantity":1,"price":0.65}}}	4	2021-01-31 19:38:00-05	2021-01-31 19:42:00-05	4.30	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A82	A	82	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-01-31 19:45:00-05	2021-01-31 19:45:00-05	1.50	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A79	A	79	wait	{"pants":{"dry_clean":{"quantity":1,"price":2.65}}}	1	2021-01-31 19:37:00-05	2021-01-31 19:42:00-05	2.65	Yeyesada
VICNT	NULL	\N	VICNT-A92	A	92	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-04 23:53:00-05	2021-02-04 23:53:00-05	1.50	
VICNT	GUQ13	Robert Zheng	VICNT-A90	A	90	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-04 23:42:00-05	2021-02-04 23:45:00-05	1.50	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A88	A	88	retired	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-01 23:32:00-05	2021-02-03 23:38:00-05	1.50	Yeyesada Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A91	A	91	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-04 23:43:00-05	2021-02-04 23:45:00-05	1.50	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A89	A	89	processing	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-04 23:41:00-05	2021-02-04 23:47:00-05	1.50	Yeyesada
VICNT	BEBQ2	Robert Zheng	VICNT-A93	A	93	wait	{"shirt":{"wash_iron":{"quantity":1,"price":1.3}}}	1	2021-02-05 20:16:00-05	2021-02-05 20:19:00-05	1.30	xopaaaa
VICNT	GUQ13	Robert Zheng	VICNT-A87	A	87	retired	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-02-01 23:07:00-05	2021-02-01 23:12:00-05	1.65	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A86	A	86	retired	{"pants":{"dry_clean":{"quantity":1,"price":1.65}}}	1	2021-02-01 23:05:00-05	2021-02-01 23:11:00-05	1.65	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A83	A	83	wait	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-01 22:19:00-05	2021-02-01 22:24:00-05	1.50	Sin pliegue | 不折
VICNT	GUQ13	Robert Zheng	VICNT-A85	A	85	ready	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	1	2021-02-01 22:24:00-05	2021-02-01 22:29:00-05	1.50	Yeyesada
VICNT	GUQ13	Robert Zheng	VICNT-A84	A	84	processing	{"shirt":{"dry_clean":{"quantity":1,"price":1.5}}}	2	2021-02-01 22:23:00-05	2021-02-01 22:27:00-05	1.50	Proyyecgdadw
\.


--
-- TOC entry 3082 (class 0 OID 16440)
-- Dependencies: 202
-- Data for Name: price_chart; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.price_chart (laundry_initials, iron, wash_iron, wash, dry_clean, extras) FROM stdin;
VICNT	{"shirt":0.65,"pants":0.65,"skirt":0.65,"coat":0.65,"sweater":0.65,"pleatedSkirt":0.65,"overall":0.65,"jumper":2,"blouse":1,"largeSuit":1,"quilt":8}	{"shirt":1.3,"pants":1.3,"skirt":1.3,"coat":2.5,"sweater":1.3,"pleatedSkirt":3,"overall":4,"jumper":4,"blouse":1.5,"largeSuit":7,"quilt":10}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":1.5,"pants":1.65,"skirt":2,"coat":0,"sweater":0.65,"pleatedSkirt":0.65,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"hook":0.1}
CAMINO	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"hook":0}
PLAC	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"hook":0}
DAOG	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"hook":0}
VICAT	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}	{"hook":0}
\.


--
-- TOC entry 3087 (class 0 OID 16605)
-- Dependencies: 207
-- Data for Name: target_market; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.target_market (id, reason) FROM stdin;
1	internet-advertisement
2	internet-advertisement
3	internet-advertisement
4	internet-advertisement
6	real-advertisement
7	internet-advertisement
9	real-advertisement
10	internet-advertisement
11	internet-advertisement
13	internet-advertisement
14	internet-advertisement
15	internet-advertisement
16	internet-advertisement
17	internet-advertisement
\.


--
-- TOC entry 3080 (class 0 OID 16405)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.users (public_id, hashcode, name, surname, email, password, verified) FROM stdin;
GUQ13	14f83adf-90b0-4b97-a33b-d2413227e794	Robert 	Zheng 	rluzheng@gmail.com	$2b$10$ILpqxGW2fYabmUbAbcjTlOgMCM.D5KpJYOyULlrOn6gXZQ7Z8vqOS	f
91FSG	e8d1d71b-cf4d-4756-8a16-c4553137fc05	Yeyo	Clack	yeyo@clack.com	$2b$10$2j6VGpWBrp3xFctobhwcuuDB/Es5S7.Z1rYLrgrzHYXi2Dkhg/7ze	f
K9ECL	28c3e1f0-41df-4b61-b77b-a53f3312b914	Robert	Zheng	robert_lu20@hotmail.com	$2b$10$GHQWrOg9Lsa8LkmMsfe2peqYWAz2rOxaNyJ6KmRPZHrAXn/lpmc4.	t
LVTOW	72667c95-7c68-4e80-bc4e-925f72849cb1	Robert	Zheng	robert.lu@utp.ac.pa	$2b$10$X3w7EPcC.t3ZFd/1qHXuV.G7fs4gslwPXlA6hMITUAqG95Ib/3SpK	f
BEBQ2	5a6a91c2-db57-4357-9543-51c6ff9710c1	Robert	Zheng	wardinpro123@gmail.com	$2b$10$KfLJNdblwNkQGr2eIjRohuwGggrJ43TQ0e/kbcYorrZ3eWmsB2JgW	f
NULL	NULL	NULL	NULL	NULL	NULL	t
\.


--
-- TOC entry 3088 (class 0 OID 24846)
-- Dependencies: 208
-- Data for Name: verification_tokens; Type: TABLE DATA; Schema: public; Owner: rober
--

COPY public.verification_tokens (hashcode, token, created_at) FROM stdin;
72667c95-7c68-4e80-bc4e-925f72849cb1	0b6ea4d8732f608630ec68f6a3a5a96e	2020-12-25 00:17:00-05
5a6a91c2-db57-4357-9543-51c6ff9710c1	bdd9d7a03cb859f7e004b7251f3bd6ec	2021-01-02 23:32:00-05
28c3e1f0-41df-4b61-b77b-a53f3312b914	9a542f170a68e4265094aa5ce2810047	2021-01-05 19:09:00-05
\.


--
-- TOC entry 3100 (class 0 OID 0)
-- Dependencies: 211
-- Name: feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rober
--

SELECT pg_catalog.setval('public.feedback_id_seq', 3, true);


--
-- TOC entry 3101 (class 0 OID 0)
-- Dependencies: 206
-- Name: target_market_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rober
--

SELECT pg_catalog.setval('public.target_market_id_seq', 17, true);


--
-- TOC entry 2939 (class 2606 OID 33089)
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 16552)
-- Name: laundries laundries_hashcode_key; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_hashcode_key UNIQUE (hashcode);


--
-- TOC entry 2929 (class 2606 OID 16426)
-- Name: laundries laundries_initials_key; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_initials_key UNIQUE (initials);


--
-- TOC entry 2931 (class 2606 OID 16424)
-- Name: laundries laundries_pkey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_pkey PRIMARY KEY (email);


--
-- TOC entry 2937 (class 2606 OID 33076)
-- Name: notifications_for_laundries notifications_for_laundries_pkey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_pkey PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 33078)
-- Name: notifications_for_users notifications_for_users_pkey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_for_users_pkey PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 16507)
-- Name: orders primarykey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT primarykey PRIMARY KEY (id);


--
-- TOC entry 2921 (class 2606 OID 16563)
-- Name: users users_hashcode_key; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_hashcode_key UNIQUE (hashcode);


--
-- TOC entry 2923 (class 2606 OID 16414)
-- Name: users users_id_key; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (public_id);


--
-- TOC entry 2925 (class 2606 OID 16430)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- TOC entry 2942 (class 2606 OID 24871)
-- Name: custom_messages custom_messages_laundry_initials_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.custom_messages
    ADD CONSTRAINT custom_messages_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2941 (class 2606 OID 24866)
-- Name: last_order_id last_order_id_laundry_initials_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.last_order_id
    ADD CONSTRAINT last_order_id_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2946 (class 2606 OID 24894)
-- Name: notifications_for_users notifications_emitter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_emitter_fkey FOREIGN KEY (emitter) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2948 (class 2606 OID 33065)
-- Name: notifications_for_laundries notifications_for_laundries_emitter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_emitter_fkey FOREIGN KEY (emitter) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2949 (class 2606 OID 33070)
-- Name: notifications_for_laundries notifications_for_laundries_getter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_getter_fkey FOREIGN KEY (getter) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2947 (class 2606 OID 24909)
-- Name: notifications_for_users notifications_getter_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_getter_fkey1 FOREIGN KEY (getter) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2943 (class 2606 OID 24876)
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2944 (class 2606 OID 24881)
-- Name: orders orders_laundry_initials_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2940 (class 2606 OID 16458)
-- Name: price_chart pricechart_laundryInitials_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.price_chart
    ADD CONSTRAINT "pricechart_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2945 (class 2606 OID 24854)
-- Name: verification_tokens verification_tokens_hashcode_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rober
--

ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_hashcode_fkey FOREIGN KEY (hashcode) REFERENCES public.users(hashcode) ON DELETE CASCADE;


-- Completed on 2021-02-07 00:15:38

--
-- PostgreSQL database dump complete
--

