import { RegisterPage } from "../(components)/Register";

export default function CandidateRegisterPage() {
  return (
    <RegisterPage
      title="Candidate"
      titleAccent="Registration"
      description="Create your account to explore job opportunities worldwide."
      emailPlaceholder="candidate@email.com"
      userType="CANDIDATE"
    />
  );
}
