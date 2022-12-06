<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221206125724 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cover_image ADD text_intro_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE cover_image ADD CONSTRAINT FK_1CDF82CA2EA9D85C FOREIGN KEY (text_intro_id) REFERENCES text_intro (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1CDF82CA2EA9D85C ON cover_image (text_intro_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE cover_image DROP CONSTRAINT FK_1CDF82CA2EA9D85C');
        $this->addSql('DROP INDEX UNIQ_1CDF82CA2EA9D85C');
        $this->addSql('ALTER TABLE cover_image DROP text_intro_id');
    }
}
