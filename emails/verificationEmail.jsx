import {
    Font,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Row,
    Section,
    Text
} from "@react-email/components";

export default function VerificationEmail({ name, token }) {
  return (
    <Html>
      <Head>
        <title>Verify Your Account</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Thank you for registering.</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello, {String(name).charAt(0).toUpperCase() + String(name).slice(1)}</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering. Please{" "}
            <Link href={`${process.env.BASEURL}/new-verification?token=${token}`}>click here</Link> to complete
            your registration.
          </Text>
        </Row>
        <Row>
          <Text>
            If you did not request this, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
