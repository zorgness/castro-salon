<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CoverImageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ApiResource()]
#[ORM\Entity(repositoryClass: CoverImageRepository::class)]
#[ApiFilter(SearchFilter::class, properties: ['textIntro' => 'exact'])]

class CoverImage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToOne]
    #[ORM\JoinColumn(referencedColumnName: 'id', unique: true)]
    private ?TextIntro $textIntro = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getTextIntro(): ?TextIntro
    {
        return $this->textIntro;
    }
}
