FROM php:7.4-fpm-alpine as backend-stage

WORKDIR /var/www/html/backend

RUN docker-php-ext-install pdo_mysql sockets
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install \
    && php artisan migrate passport install

COPY . .
