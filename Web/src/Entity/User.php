<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;



/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *     collectionOperations={
 *          "get",
 *          "post"={
 *              "validation_groups"={"Default", "create"}
 *          }
 *     },
 * )
 */

class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true, nullable=false)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=20, nullable=false)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=20, nullable=false)
     */
    private $lastname;

    /**
     * @ORM\Column(type="datetime", length=255, nullable=false)
     */
    private $birthDate;

    /**
     * @ORM\Column(type="integer", length=255, nullable=false)
     */
    private $weight;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", nullable=false)
     */
    private $password;

    /**
     * @SerializedName("password")
     * @Assert\NotBlank(groups={"create"})
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Course", mappedBy="user")
     */
    private $courses;

    public function __construct()
    {
        $this->courses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
      return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
      $this->lastname = $lastname;

      return $this;
    }

    public function getEmail(): ?string
    {
      return $this->email;
    }

    public function setEmail(string $email): self
    {
      $this->email = $email;

      return $this;
    }

    public function getBirthDate(): ?\DateTime
    {
      return $this->birthDate;
    }

    public function setBirthDate(\DateTime $birthDate): self
    {
      $this->birthDate = $birthDate;

      return $this;
    }

    public function getWeight(): ?int
    {
      return $this->weight;
    }

    public function setWeight(int $weight): self
    {
      $this->weight = $weight;

      return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->firstname;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }


    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Course[]
     */
    public function getCourses(): Collection
    {
        return $this->courses;
    }

    public function addCourse(Course $course): self
    {
        if (!$this->courses->contains($course)) {
            $this->courses[] = $course;
            $course->setUser($this);
        }

        return $this;
    }

    public function removeCourse(Course $course): self
    {
        if ($this->courses->contains($course)) {
            $this->courses->removeElement($course);
            // set the owning side to null (unless already changed)
            if ($course->getUser() === $this) {
                $course->setUser(null);
            }
        }

        return $this;
    }

    public function getPlainPassword(): ?string
    {
      return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): self
    {
      $this->plainPassword = $plainPassword;
      return $this;
    }
}
