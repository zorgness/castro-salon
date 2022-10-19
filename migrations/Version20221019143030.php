<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221019143030 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE text_intro DROP CONSTRAINT fk_4cb17f7df6154ffa');
        $this->addSql('DROP INDEX uniq_4cb17f7df6154ffa');
        $this->addSql('ALTER TABLE text_intro RENAME COLUMN product_image_id TO image_id');
        $this->addSql('ALTER TABLE text_intro ADD CONSTRAINT FK_4CB17F7D3DA5256D FOREIGN KEY (image_id) REFERENCES cover_image (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4CB17F7D3DA5256D ON text_intro (image_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE text_intro DROP CONSTRAINT FK_4CB17F7D3DA5256D');
        $this->addSql('DROP INDEX UNIQ_4CB17F7D3DA5256D');
        $this->addSql('ALTER TABLE text_intro RENAME COLUMN image_id TO product_image_id');
        $this->addSql('ALTER TABLE text_intro ADD CONSTRAINT fk_4cb17f7df6154ffa FOREIGN KEY (product_image_id) REFERENCES product_image (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_4cb17f7df6154ffa ON text_intro (product_image_id)');
    }
}
