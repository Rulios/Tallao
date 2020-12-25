PGDMP                          x            tallao    13.0    13.0 $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16404    tallao    DATABASE     c   CREATE DATABASE tallao WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Panama.1252';
    DROP DATABASE tallao;
                postgres    false            �            1259    16479    custom_messages    TABLE       CREATE TABLE public.custom_messages (
    laundry_initials character varying(6) NOT NULL,
    id character varying(50) NOT NULL,
    color_tag character varying(50) DEFAULT '#696B65'::character varying NOT NULL,
    tag text NOT NULL,
    message text NOT NULL
);
 #   DROP TABLE public.custom_messages;
       public         heap    postgres    false            �            1259    16470    last_order_id    TABLE     �   CREATE TABLE public.last_order_id (
    laundry_initials character varying(6) NOT NULL,
    id_char character varying(50) NOT NULL,
    id_number integer DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.last_order_id;
       public         heap    postgres    false            �            1259    16417 	   laundries    TABLE     �  CREATE TABLE public.laundries (
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
    DROP TABLE public.laundries;
       public         heap    postgres    false            �            1259    16492    orders    TABLE     �  CREATE TABLE public.orders (
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
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16440    price_chart    TABLE     7  CREATE TABLE public.price_chart (
    laundry_initials character varying(6) NOT NULL,
    iron json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    wash_iron json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    wash json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    dry_clean json DEFAULT '{"shirt":0,"pants":0,"skirt":0,"coat":0,"sweater":0,"pleatedSkirt":0,"overall":0,"jumper":0,"blouse":0,"largeSuit":0,"quilt":0}'::json NOT NULL,
    extras json DEFAULT '{"hook":0}'::json NOT NULL
);
    DROP TABLE public.price_chart;
       public         heap    postgres    false            �            1259    16605    target_market    TABLE     a   CREATE TABLE public.target_market (
    id integer NOT NULL,
    reason character varying(50)
);
 !   DROP TABLE public.target_market;
       public         heap    postgres    false            �            1259    16603    target_market_id_seq    SEQUENCE     �   CREATE SEQUENCE public.target_market_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.target_market_id_seq;
       public          postgres    false    207            �           0    0    target_market_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.target_market_id_seq OWNED BY public.target_market.id;
          public          postgres    false    206            �            1259    16405    users    TABLE       CREATE TABLE public.users (
    public_id character varying(6) NOT NULL,
    hashcode character varying(100) NOT NULL,
    name text NOT NULL,
    surname text NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    verified boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24846    verification_tokens    TABLE     �   CREATE TABLE public.verification_tokens (
    hashcode character varying(100) NOT NULL,
    token text NOT NULL,
    created_at timestamp with time zone NOT NULL
);
 '   DROP TABLE public.verification_tokens;
       public         heap    postgres    false            R           2604    16608    target_market id    DEFAULT     t   ALTER TABLE ONLY public.target_market ALTER COLUMN id SET DEFAULT nextval('public.target_market_id_seq'::regclass);
 ?   ALTER TABLE public.target_market ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            �          0    16479    custom_messages 
   TABLE DATA           X   COPY public.custom_messages (laundry_initials, id, color_tag, tag, message) FROM stdin;
    public          postgres    false    204   �2       �          0    16470    last_order_id 
   TABLE DATA           M   COPY public.last_order_id (laundry_initials, id_char, id_number) FROM stdin;
    public          postgres    false    203   �3       �          0    16417 	   laundries 
   TABLE DATA           �   COPY public.laundries (initials, hashcode, name, location, schedule, serviceoffer, legalreprname, legalreprsurname, email, password) FROM stdin;
    public          postgres    false    201   �3       �          0    16492    orders 
   TABLE DATA           �   COPY public.orders (laundry_initials, customer_id, customer_name, id, id_char, id_number, status, elements_details, hook_quantity, date_receive, date_assign, total_price, indications) FROM stdin;
    public          postgres    false    205   �6       �          0    16440    price_chart 
   TABLE DATA           a   COPY public.price_chart (laundry_initials, iron, wash_iron, wash, dry_clean, extras) FROM stdin;
    public          postgres    false    202   �7       �          0    16605    target_market 
   TABLE DATA           3   COPY public.target_market (id, reason) FROM stdin;
    public          postgres    false    207   �8       �          0    16405    users 
   TABLE DATA           ^   COPY public.users (public_id, hashcode, name, surname, email, password, verified) FROM stdin;
    public          postgres    false    200   9       �          0    24846    verification_tokens 
   TABLE DATA           J   COPY public.verification_tokens (hashcode, token, created_at) FROM stdin;
    public          postgres    false    208   u:       �           0    0    target_market_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.target_market_id_seq', 9, true);
          public          postgres    false    206            Z           2606    16552     laundries laundries_hashcode_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_hashcode_key UNIQUE (hashcode);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_hashcode_key;
       public            postgres    false    201            \           2606    16426     laundries laundries_initials_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_initials_key UNIQUE (initials);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_initials_key;
       public            postgres    false    201            ^           2606    16424    laundries laundries_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_pkey;
       public            postgres    false    201            `           2606    16507    orders primarykey 
   CONSTRAINT     O   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT primarykey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT primarykey;
       public            postgres    false    205            T           2606    16563    users users_hashcode_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_hashcode_key UNIQUE (hashcode);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_hashcode_key;
       public            postgres    false    200            V           2606    16414    users users_id_key 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (public_id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_key;
       public            postgres    false    200            X           2606    16430    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            c           2606    16487 3   custom_messages customMessages_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.custom_messages
    ADD CONSTRAINT "customMessages_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 _   ALTER TABLE ONLY public.custom_messages DROP CONSTRAINT "customMessages_laundryInitials_fkey";
       public          postgres    false    201    2908    204            b           2606    16473 .   last_order_id lastOrderID_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.last_order_id
    ADD CONSTRAINT "lastOrderID_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 Z   ALTER TABLE ONLY public.last_order_id DROP CONSTRAINT "lastOrderID_laundryInitials_fkey";
       public          postgres    false    203    2908    201            d           2606    16501 "   orders orders_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE;
 N   ALTER TABLE ONLY public.orders DROP CONSTRAINT "orders_laundryInitials_fkey";
       public          postgres    false    201    205    2908            a           2606    16458 +   price_chart pricechart_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.price_chart
    ADD CONSTRAINT "pricechart_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.price_chart DROP CONSTRAINT "pricechart_laundryInitials_fkey";
       public          postgres    false    201    2908    202            e           2606    24854 5   verification_tokens verification_tokens_hashcode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_hashcode_fkey FOREIGN KEY (hashcode) REFERENCES public.users(hashcode) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.verification_tokens DROP CONSTRAINT verification_tokens_hashcode_fkey;
       public          postgres    false    200    2900    208            �   �   x�sv�����tS����yI��ٙE%�U�ʮf.�.Μ��y
9��饩
5
Ov�>뚁U�+���1�L�MKOI�V��m@�RJ��3s̳M*9��S�Ҍ8#S+�3"� 11�������$;���(߼�<�Q�(���L7*,,��TNJ5464�(ʯŉ)��[�dgf���& ���jjrp*H1Pp�8:s���B�UY�&��d�8F��� �i�      �   ,   x�sv�����t�4�
�tv�A,?˘+���,���� ۖ�      �   �  x���N�0��ӫ�2���Ѧ�H��O�hR��N�8�q�ԋ��*���0*�-'h�vb}���>�����u�g�t��"#����-C˴d��ذT۷}S�o�b��"q�r"#���uq]�
D�v������HĤ2$	�QST�8��L<E��(ʄ;)�(F��N�9b�(+�t ��0��D(��Q�UgY�xA�-�����;*GI0}���
�NK���r���wX�?�V�Q��\
w�-�AB��(�Mc���ò�.���'���7#4�1�9ˀ�F)��F����eox�=������.݆���H`����~��2j��cpK���֎�MG�Ŷb�D�H։�>�l�}�����~�W�d~� n/f�d��hm޸��v�6d���nE敬e�t]���,�+��'A�WaQ����|oڟ�a��dA�ֹ�#�_{���h�v���F�9ܛ�Qm�:�3���BՔu]��U�0��(15ciL? 4���Tm����an8�N���Q�-��"���4)T�p����27@��w/����ꙴ�e�t�X��#��˯��� �a:�����_�5�9p�#��5`U�5l�C�%C��m ��P�n���O��p��e)��8,�����=Qr����.��.n��ך-nd���ܣ�cm4�d&V���[gEQ^Ծ4j��/��g      �     x����J�@���)�=�03K�<��3$�K�P��I�P��w���MҦ�xj�6�ف�����^����)�.�������3H�F+�A�3鴁�����R���5��¤yW</Ӽ�u#5����H���m}�[տ&h=�#cH��O4b���8R76��҈W������$#6�6����*��Y0i����ҭϨ����^$Xi�>��8�'�弤���XW�������j�1�6�~�C����A      �   �   x��ջ�0��>�i,x�a"�h�\�6�T�t0���JIM``���/=M�ܕ��>��$����G*!ɨ|vT�f4e�*�y��t�x��r������E&DN�+�e��f!�ӷ��z�@�(���{���'.��J��+���J��¦^h��T³
	��iWNRs��D��M�d%��	Rj���+�ؐ�0,3m!�Zӄ�9!�Q�4����Eۥ�u�h��-�`�!�ͣ��      �   >   x�3���+I-�K-�ML)K-*�,N�M�+�2�%a�K���gQjb��9.Ֆ�T��qqq ��>�      �   Q  x�]��r�0 ��ux�.�FI�켠��0VQa:�IB��P/O_m��t��ݙϋf� di��TCf
Z�Q�	0�"SE�^���$u�^@���gu���MY@�2��t�z+�c.��
�[�a6�O���&qx�����l��h�|��9�Cù����"��RhQ���PZ�M�Z�6�խ ���=�=�#���޵��i�+O�:�U!6Y�n�5��紙�2ʬ������M֢w��$��NX�pM Ò><��2.l��p5=~8@�=����MQ�'Q[���l����;�Q*�Z��[5<F�Ϧx�tw�O����e͂�*�i�1~�      �   V   x���� �sN����:K��z�7�g��P�r��E1�3,�G��ǋj&f�L��CU��O���L=!�b0[y�R��c     