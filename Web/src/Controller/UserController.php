<?php

namespace App\Controller;

use App\Entity\Course;
use App\Entity\User;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoder;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
  /**
   * @Route("/users", name="users")
   */
  public function showUsersList()
  {
    $user = $this->getDoctrine()->getRepository(User::class);
    $userList = $user->findAll();

    return $this->render('user/users.html.twig', [
      "users" => $userList
    ]);
  }

  /**
   * @Route("/delete/user/{id}", name="delete_user")
   */
  public function deleteUser(Request $request, EntityManagerInterface $entityManager)
  {
    $user = $this->getDoctrine()->getRepository(User::class)->find($request->attributes->get('id'));

    $entityManager->remove($user);
    $entityManager->flush();

    return $this->redirectToRoute('users');
  }

  /**
   * @Route("/add/user", name="add_user")
   */
  public function addUser(Request $request, EntityManagerInterface $entityManager, UserPasswordEncoderInterface $encoder)
  {

    $firstname = $request->request->get('firstname');
    $lastname = $request->request->get('lastname');
    $email = $request->request->get('email');
    $password = $request->request->get('password');
    $birthDate = $request->request->get('birthDate');
    $weight = $request->request->get('weight');

    $user = new User();

    $user->setFirstname($firstname)
         ->setLastname($lastname)
         ->setEmail($email)
         ->setPassword($encoder->encodePassword($user, $password))
         ->setBirthDate(new \DateTime($birthDate))
         ->setWeight($weight);

    $entityManager->persist($user);
    $entityManager->flush();

    return $this->redirectToRoute('users');
  }

  /**
   * @Route("/edit/user/{id}", name="edit_user")
   */
  public function editUser(Request $request, EntityManagerInterface $entityManager, UserPasswordEncoderInterface $encoder)
  {

    $firstname = $request->request->get('firstname');
    $lastname = $request->request->get('lastname');
    $email = $request->request->get('email');
    $birthDate = $request->request->get('birthDate');
    $weight = $request->request->get('weight');

    $user = $this->getDoctrine()->getRepository(User::class)->find($request->attributes->get('id'));

    $user->setFirstname($firstname)
      ->setLastname($lastname)
      ->setEmail($email)
      ->setBirthDate(new \DateTime($birthDate))
      ->setWeight($weight);

    $entityManager->persist($user);
    $entityManager->flush();

    return $this->redirectToRoute('users');
  }

  /**
   * @Route("/courses", name="courses")
   */
  public function showCoursesList()
  {
    $course = $this->getDoctrine()->getRepository(Course::class);
    $courseList = $course->findAll();

    return $this->render('user/courses.html.twig', [
      "courses" => $courseList,
    ]);
  }

  /**
   * @Route("/delete/course/{id}", name="delete_course")
   */
  public function deleteCourse(Request $request, EntityManagerInterface $entityManager)
  {
    $course = $this->getDoctrine()->getRepository(Course::class)->find($request->attributes->get('id'));

    $entityManager->remove($course);
    $entityManager->flush();

    return $this->redirectToRoute('courses');
  }

  /**
   * @Route("/edit/course/{id}", name="edit_course")
   */
  public function addCourse(Request $request, EntityManagerInterface $entityManager)
  {

    $distance = $request->request->get('distance');
    $avgSpeed = $request->request->get('avgSpeed');
    $maxSpeed = $request->request->get('maxSpeed');
    $time = $request->request->get('time');
    $createdAt = $request->request->get('createdAt');

    $course = $this->getDoctrine()->getRepository(Course::class)->find($request->attributes->get('id'));

    $course->setDistance($distance)
           ->setAvgSpeed($avgSpeed)
           ->setMaxSpeed($maxSpeed)
           ->setTime(new \DateTime($time))
           ->setCreatedAt(new \DateTime($createdAt));

    $entityManager->persist($course);
    $entityManager->flush();

    return $this->redirectToRoute('courses');
  }

}
