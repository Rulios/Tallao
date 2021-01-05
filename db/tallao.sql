PGDMP         5                 y            tallao    13.0    13.0 /               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16404    tallao    DATABASE     c   CREATE DATABASE tallao WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Panama.1252';
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
       public         heap    postgres    false            �            1259    33058    notifications_for_laundries    TABLE     M  CREATE TABLE public.notifications_for_laundries (
    id character varying(100) NOT NULL,
    emitter character varying(20) NOT NULL,
    getter character varying(20) NOT NULL,
    code character varying(50) NOT NULL,
    extras jsonb,
    getter_has_viewed boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL
);
 /   DROP TABLE public.notifications_for_laundries;
       public         heap    postgres    false            �            1259    24886    notifications_for_users    TABLE     ^  CREATE TABLE public.notifications_for_users (
    id character varying(100) DEFAULT ''::character varying NOT NULL,
    emitter character varying(20) NOT NULL,
    getter character varying(20) NOT NULL,
    code character varying(50) NOT NULL,
    extras jsonb,
    getter_has_viewed boolean DEFAULT false,
    created_at timestamp with time zone
);
 +   DROP TABLE public.notifications_for_users;
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
       public          postgres    false    207                       0    0    target_market_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.target_market_id_seq OWNED BY public.target_market.id;
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
       public         heap    postgres    false            \           2604    16608    target_market id    DEFAULT     t   ALTER TABLE ONLY public.target_market ALTER COLUMN id SET DEFAULT nextval('public.target_market_id_seq'::regclass);
 ?   ALTER TABLE public.target_market ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207                      0    16479    custom_messages 
   TABLE DATA           X   COPY public.custom_messages (laundry_initials, id, color_tag, tag, message) FROM stdin;
    public          postgres    false    204   F                 0    16470    last_order_id 
   TABLE DATA           M   COPY public.last_order_id (laundry_initials, id_char, id_number) FROM stdin;
    public          postgres    false    203   7G       �          0    16417 	   laundries 
   TABLE DATA           �   COPY public.laundries (initials, hashcode, name, location, schedule, serviceoffer, legalreprname, legalreprsurname, email, password) FROM stdin;
    public          postgres    false    201   {G                 0    33058    notifications_for_laundries 
   TABLE DATA           w   COPY public.notifications_for_laundries (id, emitter, getter, code, extras, getter_has_viewed, created_at) FROM stdin;
    public          postgres    false    210   �J                 0    24886    notifications_for_users 
   TABLE DATA           s   COPY public.notifications_for_users (id, emitter, getter, code, extras, getter_has_viewed, created_at) FROM stdin;
    public          postgres    false    209   �J                 0    16492    orders 
   TABLE DATA           �   COPY public.orders (laundry_initials, customer_id, customer_name, id, id_char, id_number, status, elements_details, hook_quantity, date_receive, date_assign, total_price, indications) FROM stdin;
    public          postgres    false    205   �L                  0    16440    price_chart 
   TABLE DATA           a   COPY public.price_chart (laundry_initials, iron, wash_iron, wash, dry_clean, extras) FROM stdin;
    public          postgres    false    202   �N                 0    16605    target_market 
   TABLE DATA           3   COPY public.target_market (id, reason) FROM stdin;
    public          postgres    false    207   �O       �          0    16405    users 
   TABLE DATA           ^   COPY public.users (public_id, hashcode, name, surname, email, password, verified) FROM stdin;
    public          postgres    false    200   �O                 0    24846    verification_tokens 
   TABLE DATA           J   COPY public.verification_tokens (hashcode, token, created_at) FROM stdin;
    public          postgres    false    208   R                  0    0    target_market_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.target_market_id_seq', 11, true);
          public          postgres    false    206            g           2606    16552     laundries laundries_hashcode_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_hashcode_key UNIQUE (hashcode);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_hashcode_key;
       public            postgres    false    201            i           2606    16426     laundries laundries_initials_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_initials_key UNIQUE (initials);
 J   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_initials_key;
       public            postgres    false    201            k           2606    16424    laundries laundries_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.laundries
    ADD CONSTRAINT laundries_pkey PRIMARY KEY (email);
 B   ALTER TABLE ONLY public.laundries DROP CONSTRAINT laundries_pkey;
       public            postgres    false    201            q           2606    33076 <   notifications_for_laundries notifications_for_laundries_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_pkey PRIMARY KEY (id);
 f   ALTER TABLE ONLY public.notifications_for_laundries DROP CONSTRAINT notifications_for_laundries_pkey;
       public            postgres    false    210            o           2606    33078 4   notifications_for_users notifications_for_users_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_for_users_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.notifications_for_users DROP CONSTRAINT notifications_for_users_pkey;
       public            postgres    false    209            m           2606    16507    orders primarykey 
   CONSTRAINT     O   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT primarykey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT primarykey;
       public            postgres    false    205            a           2606    16563    users users_hashcode_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_hashcode_key UNIQUE (hashcode);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_hashcode_key;
       public            postgres    false    200            c           2606    16414    users users_id_key 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_id_key UNIQUE (public_id);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT users_id_key;
       public            postgres    false    200            e           2606    16430    users users_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    200            t           2606    24871 5   custom_messages custom_messages_laundry_initials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.custom_messages
    ADD CONSTRAINT custom_messages_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.custom_messages DROP CONSTRAINT custom_messages_laundry_initials_fkey;
       public          postgres    false    2921    201    204            s           2606    24866 1   last_order_id last_order_id_laundry_initials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.last_order_id
    ADD CONSTRAINT last_order_id_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.last_order_id DROP CONSTRAINT last_order_id_laundry_initials_fkey;
       public          postgres    false    2921    201    203            x           2606    24894 2   notifications_for_users notifications_emitter_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_emitter_fkey FOREIGN KEY (emitter) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.notifications_for_users DROP CONSTRAINT notifications_emitter_fkey;
       public          postgres    false    2921    201    209            z           2606    33065 D   notifications_for_laundries notifications_for_laundries_emitter_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_emitter_fkey FOREIGN KEY (emitter) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;
 n   ALTER TABLE ONLY public.notifications_for_laundries DROP CONSTRAINT notifications_for_laundries_emitter_fkey;
       public          postgres    false    2915    200    210            {           2606    33070 C   notifications_for_laundries notifications_for_laundries_getter_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_for_laundries
    ADD CONSTRAINT notifications_for_laundries_getter_fkey FOREIGN KEY (getter) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 m   ALTER TABLE ONLY public.notifications_for_laundries DROP CONSTRAINT notifications_for_laundries_getter_fkey;
       public          postgres    false    210    2921    201            y           2606    24909 2   notifications_for_users notifications_getter_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY public.notifications_for_users
    ADD CONSTRAINT notifications_getter_fkey1 FOREIGN KEY (getter) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.notifications_for_users DROP CONSTRAINT notifications_getter_fkey1;
       public          postgres    false    2915    209    200            u           2606    24876    orders orders_customer_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.users(public_id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_customer_id_fkey;
       public          postgres    false    2915    200    205            v           2606    24881 #   orders orders_laundry_initials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_laundry_initials_fkey FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_laundry_initials_fkey;
       public          postgres    false    2921    201    205            r           2606    16458 +   price_chart pricechart_laundryInitials_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.price_chart
    ADD CONSTRAINT "pricechart_laundryInitials_fkey" FOREIGN KEY (laundry_initials) REFERENCES public.laundries(initials) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.price_chart DROP CONSTRAINT "pricechart_laundryInitials_fkey";
       public          postgres    false    202    2921    201            w           2606    24854 5   verification_tokens verification_tokens_hashcode_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.verification_tokens
    ADD CONSTRAINT verification_tokens_hashcode_fkey FOREIGN KEY (hashcode) REFERENCES public.users(hashcode) ON DELETE CASCADE;
 _   ALTER TABLE ONLY public.verification_tokens DROP CONSTRAINT verification_tokens_hashcode_fkey;
       public          postgres    false    208    2913    200                 x���MN�@���)&!!����CXP3��L�1��i��kf���x���!ݸW�Z��t��R]�w3_,��팬�&J[�gͮk�^�
|�ͤ.s�>�����������Geu�� D�0�X~(�i���[^��a/gˊĊb:f�������V�,��Q��������9�@�(��)��j/�%19�:�Yb�I�Aj��@�T������Q��8�tP1Br�>A+;�}j����%%m�M���i�xO�K���^��$��4Y�V���G���\Q��n�\         4   x��t��t�4��rv������|��Gw0#���1̊���� @x
�      �   .  x���Kn�8�|
A���Q�^AQD�cW�y8IcP|زeJ���r��� =E/6J�	��4��,�ȏߟ���a0I&���<]E�#*d�U=�vT�2b9���-��'�	߾"�2ƔT:A-�}i�O�n��ܪ{VM��$Z��*PsT/���8��/b4I�;e�r�*��N�$��i)���4������W�M�(i�%��<�G�XR�_�)��xa���e����vD�_;���e��npBo.Q>��Eʛ���Z:K#*
YO)���	�L��0''NҞ�}o0�.�$��e����74��=�������]	�Y�ڡ�8���-�u1�UjxH�25�Pm�B/�e;?Z�y'���7p�����F�NZ�;� �Ѹ��F�.<��[���VCyBq�4j>�YK״J� Ax.U�����(|���{WΩ�T�]�5��l<�Mr9��U�=x�o�|"�b�e���	��a��ny�
�m�8t�F)6q1v��X�|���9qV�CI-�Oe�&Hy�v�{�����x�<�1z�&�)�p0�}�6�G�Yj�ڪ}m�:��ٜύN<:�|��w+�B�6��R���TMbG*���z �T�f��;���'��0_o����0ђ�,2a-C�(�����
�Uގ�ݣi����vP�c�������&z��ADΨ,�W��0���k��v�2<�B�1Ud��ә�e0j�GϝW!�*�W�ϑ�$��N���Jw5�y�����y�zs�յ����"��s��p�l?�\m�/�ބu��_Z�������            x������ � �         �  x���ϊ1���S�9WŲ%�ɭl/K�=�J�ȶ�tg�$iY�}�>E_���\��>��g��O�����#rE�x�-���GĈ%8b���7�����Ǫ#���?���1�֫nT�OݛU�Oq��垻m�R��8��M�vY�����.���O���N~�����-�Ͷ���e�_XcL;��n�p����#N�&3)�O�p(C����A��������v���EL�*�xbb
�U{(.D��܉�6q�� f�}�ܢ�v�:�Iv�g&Y+ޚ@��ъB� 1P4b�@.���	(z����܌�܆���3��W��9��5@֞�z�(��W䪃���,fˎJ�h9{����3��K�9��`W�]��)�͹�p�VBlV�&HL[	�2i�TB�)T�9����ڎsi��v�\��s�         �  x���_K*A ���S,HT�ώ�O�Hu�	.�6$��NT�~������>G�x�[6��Fd�=��oϜsN���Ǥ{�鐳.9ū��h�-�m�-y�ll�0}��W��1^\�@X��0e�07��`�hʲ��ť6v�o�,	'�rV���)�RJ�T΅������A>�jx����������@:=��O��Ε�A�B��3Y�@�Y�ٜ�A��T.)�KT$�#=qXʘ���%9�'�L��BYk&+.���t*[�Y��X�2���dnJ����'AO��;=\���WUq�e�Q>������o�D��0�����{_ud�E���V������Yݸ�q;d����xnw����L�d�%7W}U>��0��|�0��/�*�*�;��}~��<���O�[��Z�U�o�*q�d��^���gq����q���״�)/������2�R��x�o�c�c��z��5*��
�}q            x���M�0�s��c4{��D����i�VN�}���	�v����|~��{��|�x92����΍^c	I�󹽠*�'�1��B���J�Q�!���-[��"�"�ё��P��'!Oӻ������4��ğ��ur2�z�qjS�s���-���$Z90N��6A�H����&Hm(y��SH:�$}�a�k��eU"f��JEUo~rw0y����-:�����&#o1��S׷�>|�.��P]ߒ���ۻE}         F   x�3���+I-�K-�ML)K-*�,N�M�+�2�%a�K���gQjb��9.Ֆ�T�Rnh�K&F��� j�Q�      �   
  x�u�K��0F��W���A�Bv�i�mE����$�EA���_?�<��zf6_��;u��
���!"N 7�	-��Hc��f�/��e� ���������gq����#���|�z�����$�ȾT���OÅ1��b����J�b��h�"���_����d���(fHB�X1���#��E)A�%ʤ ��3�N��bO}����޺�nP�m��\UףAw|�kfD��2-ߟ���N����u��Eh8���	�+��`
JL(�BR��t83����?��Y���!�>'�G)��tu���i��
�z;������|�g:鏳Yp�V��7����m7�0l�Lq
��hiǄRY���	ÎŕD��1��WW�!�Q��*{Ұ��&q]����pYr��[�<ﳾ}XL7A��r:�]�.�m��x�
[p�0�%mːv8��H�I�2�'�F���R�9���_�'�lˬY�Vn����%?ԍ����"����'�¼,#�w�� ��]k�<�w�����|gF�!         �   x�E�ˍ1��QL��ӱ��`;��#�j%���ސ�}l��r��d1���˳�㵙��l�)�嬪��;���y121��X��n�ּ���u���t�_���F%]�m�݅w���I�6d؈����B|ȿpm�L;�rV�
U�;����9c�@������F[�4�� ���\����~�C�     