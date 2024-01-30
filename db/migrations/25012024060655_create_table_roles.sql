CREATE TABLE `roles` (
    `role_id`                      int (11) NOT NULL AUTO_INCREMENT,
    `role`                         varchar(50) NOT NULL,
    `updated_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,
    `created_date`                 timestamp default CURRENT_TIMESTAMP NOT NULL,
    
    PRIMARY KEY                    (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;