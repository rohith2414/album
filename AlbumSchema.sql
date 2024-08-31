create table albums(
    id int auto_increment primary key,
    title varchar(50) not null,
    artist varchar(50) not null,
    genre varchar(50) not null,
    release_year int not null,
    rating int not null,
    cover_image varchar(500)
);