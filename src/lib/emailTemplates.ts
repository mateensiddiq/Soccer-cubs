export function buildWelcomeEmail({
  childName,
  locationName,
}: {
  childName: string;
  locationName: string;
}): { subject: string; html: string } {
  return {
    subject: `Welcome to Soccer Cubs, ${childName}! Here's What to Expect ⚽`,
    html: `
      <p>Hi Soccer Cub Parent,</p>
      <p>Welcome to Soccer Cubs! We're so excited to have ${childName} join us for soccer at ${locationName}.</p>

      <p><strong>What we'll be working on</strong><br/>
      Our classes are built specifically for little ones (ages 2&ndash;6), so the focus is on fun, movement, and building comfort with the ball, not drills or pressure. Over the season the kids will work on things like:</p>
      <ul>
        <li>Dribbling and basic ball control (through fun games like "Red Light, Green Light" and weaving through cones)</li>
        <li>Kicking and passing to a target</li>
        <li>Listening skills</li>
        <li>Teamwork, taking turns, and just having a blast being active</li>
      </ul>
      <p>Every class ends with our Soccer Cubs cheer and a high-five line. It's become a favorite part of the day for the kids.</p>

      <p><strong>Free Soccer Cubs t-shirt!!!</strong><br/>
      ${childName} will receive a free Soccer Cubs t-shirt. If you're able to have them wear it on class days, we'd love that. It helps the kids feel like part of the team and makes it easy to spot our group!</p>

      <p><strong>A bit about me</strong><br/>
      My name is Mateen, but the kids know me as Coach Mateen. I've been playing soccer my whole life and currently play semi-professionally in the UPSL. I hold my USSF D License and have been coaching kids, from toddlers all the way up to teenagers, for several years now. I founded Soccer Cubs in 2019 because I wanted to bring that same love of the game to the youngest players in a way that's age-appropriate, safe, and genuinely fun. I'm the sole coach for every Soccer Cubs class, so your child will see the same familiar face each week.</p>

      <p><strong>Questions or concerns?</strong><br/>
      Please don't hesitate to reach out anytime. You can email us at <a href="mailto:joinsoccercubs@gmail.com">joinsoccercubs@gmail.com</a> and we'll get back to you as soon as we can.</p>

      <p><strong>Interested in 1-on-1 training?</strong><br/>
      For any parents interested in more individualized coaching for kids above the age of 5, outside of the group class setting, I also offer private one-on-one training sessions. Feel free to reach out if you'd like more information.</p>

      <p>Thanks so much for trusting us with ${childName}. We can't wait to get started!</p>

      <p>Warmly,<br/>
      Coach Mateen<br/>
      <a href="https://www.joinsoccercubs.com">joinsoccercubs.com</a><br/>
      Soccer Cubs<br/>
      <a href="mailto:joinsoccercubs@gmail.com">joinsoccercubs@gmail.com</a></p>
    `,
  };
}
