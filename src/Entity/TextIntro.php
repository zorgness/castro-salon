<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\TextIntroRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TextIntroRepository::class)]
#[ApiResource()]
class TextIntro
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 5000)]
    private ?string $text = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]

    private ?CoverImage $image = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(string $text): self
    {
        $this->text = $text;

        return $this;
    }

    public function getImage(): ?CoverImage
    {
        return $this->image;
    }

    public function setImage(?CoverImage $image): self
    {
        $this->image = $image;

        return $this;
    }
}
