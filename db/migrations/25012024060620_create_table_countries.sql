CREATE TABLE `countries` (
    `country_id`                   int (11) NOT NULL AUTO_INCREMENT,
    `iso`                          varchar(50) NOT NULL,
    `country`                      varchar(50) NOT NULL,
    `updated_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,
    `created_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,

    PRIMARY KEY                    (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;