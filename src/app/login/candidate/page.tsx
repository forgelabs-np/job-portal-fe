import { LoginPage } from "../(components)/Login";

export default function CandidateLoginPage() {
  return (
    <LoginPage
      title="Candidate"
      titleAccent="Portal"
      description="Find and apply for international job opportunities."
      emailPlaceholder="candidate@email.com"
      userType="candidate"
    />
  );
}
