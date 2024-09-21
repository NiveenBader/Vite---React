function AboutData() {
  return (
    <div className="mt-3">
      <p className="fs-5">
        Welcome to my platform! I’m Ala Sharkia, the creator of this project.
        This site is designed to provide a seamless and intuitive experience for
        users to manage their accounts and interact with our services
        effectively.
      </p>

      <h2> Project Overview</h2>
      <p className="fs-6">
        This web application focuses on user authentication and account
        management, featuring robust functionality for signing up, logging in,
        and managing user sessions. With a focus on security and user
        experience, the site employs modern technologies and best practices to
        ensure a smooth and reliable service.
      </p>
      <h2>Key features include:</h2>
      <ul className="fs-6">
        <li>
          User Authentication: Secure login and sign-up processes, leveraging
          JWT for token-based authentication.
        </li>
        <li>
          Dynamic User Interfaces: Built with React, the application provides a
          responsive and interactive user experience.
        </li>
        <li>
          Validation and Error Handling: Integrated Joi for data validation,
          ensuring that all user inputs are properly validated and errors are
          handled gracefully.
        </li>
        <li>
          Responsive Design: Designed to be accessible and usable across a
          variety of devices and screen sizes.
        </li>
      </ul>
      <h2>Technologies Used</h2>
      <ul className="fs-6">
        <li>React: For building dynamic and responsive user interfaces.</li>
        <li>Joi: For validating user inputs and ensuring data integrity.</li>
        <li>JWT: For secure authentication and managing user sessions.</li>
        <li>
          React-Router: For smooth navigation and routing within the
          application.
        </li>
      </ul>
    </div>
  );
}
export default AboutData;
