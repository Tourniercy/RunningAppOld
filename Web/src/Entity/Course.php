<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;


/**
 * @ORM\Entity(repositoryClass="App\Repository\CourseRepository")
 * @ApiResource
 */
class Course
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $distance;

    /**
     * @ORM\Column(type="float")
     */
    private $avgSpeed;

    /**
     * @ORM\Column(type="float")
     */
    private $maxSpeed;

    /**
     * @ORM\Column(type="time")
     */
    private $time;

    /**
     * @ORM\Column(type="text")
     */
    private $snapshot;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="courses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDistance(): ?int
    {
        return $this->distance;
    }

    public function setDistance(int $distance): self
    {
        $this->distance = $distance;

        return $this;
    }

    public function getAvgSpeed(): ?float
    {
        return $this->avgSpeed;
    }

    public function setAvgSpeed(float $avgSpeed): self
    {
        $this->avgSpeed = $avgSpeed;

        return $this;
    }

    public function getMaxSpeed(): ?float
    {
        return $this->maxSpeed;
    }

    public function setMaxSpeed(float $maxSpeed): self
    {
        $this->maxSpeed = $maxSpeed;

        return $this;
    }

    public function getTime(): ?\DateTimeInterface
    {
        return $this->time;
    }

    public function setTime(\DateTimeInterface $time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getSnapshot(): ?string
    {
        return $this->snapshot;
    }

    public function setSnapshot(string $snapshot): self
    {
        $this->snapshot = $snapshot;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
