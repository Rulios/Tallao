PGDMP     
    *            
    x            tallao    13.0    13.0 "    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16404    tallao    DATABASE     c   CREATE DATABASE tallao WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Panama.1252';
    DROP DATABASE tallao;
                postgres    false            �            1259    16479    customMessages    TABLE     <  CREATE TABLE public."customMessages" (
    "laundryInitials" character varying(6) NOT NULL,
    id character varying(50) NOT NULL,
    "colorTag" character varying(50) DEFAULT '#696B65'::character varying NOT NULL,
    tag text NOT NULL,
    message text NOT NULL,
    blocked text DEFAULT 'false'::text NOT NULL
);
 $   DROP TABLE public."customMessages";
       public         heap    postgres    false            �            1259    16470    lastOrderID    TABLE     �   CREATE TABLE public."lastOrderID" (
    "laundryInitials" character varying(6) NOT NULL,
    "idChar" character varying(50) NOT NULL,
    "idNumber" integer DEFAULT 0
);
 !   DROP TABLE public."lastOrderID";
       public         heap    postgres    false            �            1259    16417 	   laundries    TABLE     ]  CREATE TABLE public.laundries (
    initials character varying(6) NOT NULL,
    hashcode character varying(70) NOT NULL,
    name text NOT NULL,
    location text,
    schedule json,
    serviceoffer text[],
    legalreprname text NOT NULL,
    legalreprsurname text NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.laundries;
       public         heap    postgres    false            �            1259    16492    orders    TABLE     �  CREATE TABLE public.orders (
    "laundryInitials" character varying(6) NOT NULL,
    "customerID" character varying(6),
    "customerName" text,
    id character varying(50) NOT NULL,
    "idChar" character varying(50) DEFAULT ''::character varying NOT NULL,
    "idNumber" integer NOT NULL,
    status text DEFAULT 'wait'::text NOT NULL,
    "elementsDetails" json NOT NULL,
    "hookQuantity" integer DEFAULT 0 NOT NULL,
    "dateReceive" timestamp with time zone NOT NULL,
    "dateAssign" timestamp with time zone NOT NULL,
    "totalPrice" numeric(10,2) NOT NULL,
    indications text,
    CONSTRAINT positive_number CHECK ((("hookQuantity" >= 0) AND ("totalPrice" > (0)::numeric)))
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16440 
   pricechart    TABLE     L  CREATE TABLE public.pricechart (
    "laundryInitials" character varying(6) NOT NULL,
    iron json DEFAULT '{}'::json,
    "washIron" json DEFAULT '{}'::json,
    wash json DEFAULT '{}'::json,
    "dryClean" json DEFAULT '{}'::json,
    hook numeric(10,2) DEFAULT 0,
    CONSTRAINT positive_number CHECK ((hook > (0)::numeric))
);
    DROP TABLE public.pricechart;
       public         heap    postgres    false            �            1259    16519    targetMarket    TABLE     Q   CREATE TABLE public."targetMarket" (
    id integer NOT NULL,
    reason text
);
 "   DROP TABLE public."targetMarket";
       public         heap    postgres    false            �            1259    16517    targetMarket_id_seq    SEQUENCE     �   CREATE SEQUENCE public."targetMarket_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."targetMarket_id_seq";
       public          postgres    false    207            �           0    0    targetMarket_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."targetMarket_id_seq" OWNED BY public."targetMarket".id;
          public          postgres    false    206            �            1259    16405    users    TABLE     �   CREATE TABLE public.users (
    id character varying(6),
    hashcode character varying(50),
    name text,
    surname text,
    email character varying(50) NOT NULL,
    password text,
    accountverified text
);
    DROP TABLE public.users;
       public         heap    postgres    false            M           2604    16522    targetMarket id    DEFAULT     v   ALTER TABLE ONLY public."targetMarket" ALTER COLUMN id SET DEFAULT nextval('public."targetMarket_id_seq"'::regclass);
 @   ALTER TABLE public."targetMarket" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �          0    16479    customMessages 
   TABLE DATA           d   COPY public."customMessages" ("laundryInitials", id, "colorTag", tag, message, blocked) FROM stdin;
    public          postgres    false    204   ~,       �          0    16470    lastOrderID 
   TABLE DATA           P   COPY public."lastOrderID" ("laundryInitials", "idChar", "idNumber") FROM stdin;
    public          postgres    false    203   �,       �          0    16417 	   laundries 
   TABLE DATA           �   COPY public.laundries (initials, hashcode, name, location, schedule, serviceoffer, legalreprname, legalreprsurname, email, password) FROM stdin;
    public          postgres    false    201   �,       �          0    16492    orders 
   TABLE DATA           �   COPY public.orders ("laundryInitials", "customerID", "customerName", id, "idChar", "idNumber", status, "elementsDetails", "hookQuantity", "dateReceive", "dateAssign", "totalPrice", indications) FROM stdin;
    public          postgres    false    205   �,       �          0    16440 
   pricechart 
   TABLE DATA           a   COPY public.pricechart ("laundryInitials", iron, "washIron", wash, "dryClean", hook) FROM stdin;
    public          postgres    false    202   �,       �          0    16519    targetMarket 
   TABLE DATA           4   COPY public."targetMarket" (id, reason) FROM stdin;
    public          postgres    false    207   -       �          0    16405    users 
   TABLE DATA           ^   COPY public.users (id, hashcode, name, surname, email, password, accountverified) FROM stdin;
    public          postgres    false    200   ,-       �           0    0    targetMarket_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."targetMarket_id_seq"', 1, false);
          public          postgres    false    206            U           2606    16428     laundries laundries_hashcode_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_hashcode_key UNIQUE (hashcode);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_hashcode_key;
       public            postgres    false    201            W           2606    16426     laundries laundries_initials_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_initials_key UNIQUE (initials);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_initials_key;
       public            postgres    false    201            Y           2606    16424    laundries laundries_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_pkey;
       public            postgres    false    201            [           2606    16507    orders primarykey 
   CONSTRAINT     O   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT primarykey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT primarykey;
       public            postgres    false    205            ]           2606    16527    targetMarket targetMarket_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."targetMarket"
    ADD CONSTRAINT "targetMarket_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."targetMarket" DROP CONSTRAINT "targetMarket_pkey";
       public            postgres    false    207            O           2606    16416    users users_hashcode_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_hashcode_key UNIQUE (hashcode);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_hashcode_key;
       public            postgres    false    200            Q           2606    16414    users users_id_key 
   CONSTRAINT     K   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_key;
       public            postgres    false    200            S           2606    16430    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            `           2606    16487 2   customMessages customMessages_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."customMessages"
    ADD CONSTRAINT "customMessages_laundryInitials_fkey" FOREIGN KEY ("laundryInitials") REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 `   ALTER TABLE ONLY public."customMessages" DROP CONSTRAINT "customMessages_laundryInitials_fkey";
       public          postgres    false    2903    201    204            _           2606    16473 ,   lastOrderID lastOrderID_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."lastOrderID"
    ADD CONSTRAINT "lastOrderID_laundryInitials_fkey" FOREIGN KEY ("laundryInitials") REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 Z   ALTER TABLE ONLY public."lastOrderID" DROP CONSTRAINT "lastOrderID_laundryInitials_fkey";
       public          postgres    false    201    2903    203            a           2606    16501 "   orders orders_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_laundryInitials_fkey" FOREIGN KEY ("laundryInitials") REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_laundryInitials_fkey";
       public          postgres    false    201    2903    205            ^           2606    16458 *   pricechart pricechart_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.pricechart
    ADD CONSTRAINT "pricechart_laundryInitials_fkey" FOREIGN KEY ("laundryInitials") REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.pricechart DROP CONSTRAINT "pricechart_laundryInitials_fkey";
       public          postgres    false    202    201    2903            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     