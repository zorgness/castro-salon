<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221017085243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product_image DROP CONSTRAINT FK_64617F034B89032C');
        $this->addSql('ALTER TABLE product_image ADD CONSTRAINT FK_64617F034B89032C FOREIGN KEY (post_id) REFERENCES blog_post (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE product_image DROP CONSTRAINT fk_64617f034b89032c');
        $this->addSql('ALTER TABLE product_image ADD CONSTRAINT fk_64617f034b89032c FOREIGN KEY (post_id) REFERENCES blog_post (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
