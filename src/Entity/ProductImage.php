<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductImageRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\GetCollection;

#[ORM\Entity(repositoryClass: ProductImageRepository::class)]
#[ApiResource(order: ["created_at" => 'ASC'] )]
#[ApiResource(
  uriTemplate:'/blog_posts/{blogPostId}/product_images',
  uriVariables: [
    'blogPostId' => new Link(fromClass: BlogPost::class, toProperty: 'post'),
  ],
  operations: [ new GetCollection() ]
)]
class ProductImage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'productImages')]
    #[ORM\JoinColumn(onDelete: "CASCADE")]
    private ?BlogPost $post = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $created_at = null;

    public function __construct()
    {
      $this->setCreatedAt(new \DateTimeImmutable);
    }

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

    public function getPost(): ?BlogPost
    {
        return $this->post;
    }

    public function setPost(?BlogPost $post): self
    {
        $this->post = $post;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->created_at;
    }

    public function setCreatedAt(?\DateTimeImmutable $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }
}
