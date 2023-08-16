CREATE TABLE products (
  id integer PRIMARY KEY NOT NULL,
  name varchar UNIQUE NOT NULL,
  description varchar,
  category_id integer,
  base_price decimal,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE categories (
  id int PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  is_active bool DEFAULT True,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE subcategory (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  category_id integer,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE attributes (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE product_attribute (
  product_id integer,
  attribute_id integer,
  value varchar NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE size (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE color (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE product_price (
  product_id integer,
  attr_combination varchar UNIQUE NOT NULL,
  price decimal,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE inventories (
  product_id integer,
  attr_combination varchar UNIQUE NOT NULL,
  quantity int,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE profiles (
  id uuid not null,
  updated_at timestamp with time zone null,
  username text null,
  full_name text null,
  avatar_url text null,
  mobile text null,
  is_active boolean not null default true,
  role text not null default 'user'::text,
  email text null,
  constraint profiles_pkey primary key (id),
  constraint profiles_email_key unique (email),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign key (id) references auth.users (id),
  constraint username_length check ((char_length(username) >= 3))
) tablespace pg_default;
CREATE TABLE order_status (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE payment_modes (
  id integer PRIMARY KEY,
  name varchar UNIQUE NOT NULL,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE orders (
  id integer PRIMARY KEY,
  customer_id uuid,
  order_date timestamp,
  total_amount decimal,
  order_status_id integer,
  payment_mode_id integer,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE order_items (
  id integer PRIMARY KEY,
  product_id integer,
  attr_combination varchar,
  quantity integer,
  sale_price decimal,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE payments (
  id integer PRIMARY KEY,
  order_id integer,
  payment_date timestamp,
  payment_amount decimal,
  payment_mode_id integer,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE ratings (
  id integer PRIMARY KEY,
  product_id integer,
  customer_id uuid,
  rating decimal,
  comment text,
  rating_date timestamp,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE discounts (
  id integer PRIMARY KEY,
  product_id integer,
  rate decimal,
  expires_on timestamp,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE disc_product_combination (
  discount_id integer,
  product_id integer,
  attr_combination varchar,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
CREATE TABLE images (
  id integer PRIMARY KEY,
  product_id integer,
  url varchar,
  created_date timestamp DEFAULT now(),
  updated_date timestamp
);
COMMENT ON COLUMN product_attribute.value IS 'Describes the values to attribute selected';
COMMENT ON TABLE product_price IS 'Stores different prices based on attributes';
COMMENT ON COLUMN product_price.attr_combination IS 'Concatenation of attribute values';
COMMENT ON COLUMN discounts.rate IS 'A percentage';
ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories (id);
ALTER TABLE subcategory
ADD FOREIGN KEY (category_id) REFERENCES categories (id);
ALTER TABLE product_attribute
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE product_attribute
ADD FOREIGN KEY (attribute_id) REFERENCES attributes (id);
ALTER TABLE product_price
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE inventories
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE inventories
ADD FOREIGN KEY (attr_combination) REFERENCES product_price (attr_combination);
ALTER TABLE orders
ADD FOREIGN KEY (customer_id) REFERENCES profiles (id);
ALTER TABLE orders
ADD FOREIGN KEY (order_status_id) REFERENCES order_status (id);
ALTER TABLE orders
ADD FOREIGN KEY (payment_mode_id) REFERENCES payment_modes (id);
ALTER TABLE order_items
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE order_items
ADD FOREIGN KEY (attr_combination) REFERENCES product_price (attr_combination);
ALTER TABLE payments
ADD FOREIGN KEY (order_id) REFERENCES orders (id);
ALTER TABLE payments
ADD FOREIGN KEY (payment_mode_id) REFERENCES payment_modes (id);
ALTER TABLE ratings
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE ratings
ADD FOREIGN KEY (customer_id) REFERENCES profiles (id);
ALTER TABLE discounts
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE disc_product_combination
ADD FOREIGN KEY (discount_id) REFERENCES discounts (id);
ALTER TABLE disc_product_combination
ADD FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE disc_product_combination
ADD FOREIGN KEY (attr_combination) REFERENCES product_price (attr_combination);
ALTER TABLE images
ADD FOREIGN KEY (product_id) REFERENCES products (id);