<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class SecurityController extends AbstractController
{

    /**
     * @Route("/", name="home")
     */
    public function home()
    {
      return $this->redirectToRoute('app_login', [], 301);
    }

    /**
     * @Route("/signup", name="signup")
     */
    public function signup(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $encoder)
    {
      $data = json_decode($request->getContent());

      $user = new User();
      $user->setFirstname($data->firstname)
           ->setLastname($data->lastname)
           ->setBirthDate(new \DateTime($data->birthDate))
           ->setWeight($data->weight)
           ->setEmail($data->email)
           ->setPassword($encoder->encodePassword($user, $data->password));

      $em->persist($user);
      $em->flush();


      $response = new Response();
      $response->setContent(json_encode([
        'firstname' => $user->getFirstname(),
        'lastname' => $user->getLastname(),
        'birthDate' => $user->getBirthDate(),
        'weight' => $user->getWeight(),
        'email' => $user->getEmail(),
        'password'=> $user->getPassword()
      ]));
      $response->headers->set('Content-Type', 'application/json');
      $response->setStatusCode(200);

      return $response;
    }

    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        $error = $authenticationUtils->getLastAuthenticationError();

        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout()
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }

    /**
     * @Route("/users/check/{email}", name="email_check", requirements={"email"="^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$"})
     */
    public function emailCheck(Request $request)
    {
        $user = $this->getDoctrine()->getRepository(User::class)
                     ->findOneBy(array('email' => $request->get('email')));

        if (!$user) {
          return new Response('', Response::HTTP_NOT_FOUND);
        }

        $response = new Response();
        $response->setContent(json_encode([
          'email' => $user->getEmail(),
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(302);

        return $response;
    }
}
