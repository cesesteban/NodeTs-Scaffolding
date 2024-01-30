CREATE TABLE `users` (
    `user_id`                      int (11) NOT NULL AUTO_INCREMENT,
    `username`                     varchar(50) NOT NULL,
    `password`                     varchar(255) NOT NULL,
    `first_name`                   varchar(50) NOT NULL,
    `last_name`                    varchar(50) NOT NULL,
    `email`                        varchar(50) NOT NULL,
    `role_id`                      int (11) NOT NULL,
    `country_id`                   int (11) NOT NULL,
    `is_active`                    boolean DEFAULT NULL DEFAULT TRUE,
    `updated_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,
    `created_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,

    PRIMARY KEY                    (`user_id`),
    KEY `idx_role_id`              (`role_id`),
    KEY `idx_country_id`           (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;