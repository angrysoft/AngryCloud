create table users(
    username varchar(100) not null,
    password varchar(500) not null,
    enabled boolean not null,
    primary key (username)
);

create table authorities(
    username varchar(100) not null references users(username),
    authority varchar(50) not null
);

create unique index ix_auth_username on authorities (username, authority);

create table file(
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name varchar(500) not null,
    size bigint,
    parent uuid,
    type varchar(50) not null,
    owner varchar(100) references users(username),
    created timestamp not null DEFAULT now(),
    updated timestamp not null DEFAULT now(),
    unique(name, parent, owner)
);