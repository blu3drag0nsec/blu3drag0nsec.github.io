import type {ReactNode} from 'react';
import {useState} from 'react';
import Layout from '@theme/Layout';

// Rick Astley - Never Gonna Give You Up
const VIDEO_ID = 'dQw4w9WgXcQ';

export default function Awareness(): ReactNode {
  const [started, setStarted] = useState(false);

  const src = started
    ? `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=0&controls=1&rel=0`
    : '';

  return (
    <Layout
      title="One last thing"
      description="A little goodbye from blu3.">
      {!started && (
        <div
          onClick={() => setStarted(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setStarted(true);
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            cursor: 'pointer',
            background:
              'radial-gradient(circle at center, #1b1b3a 0%, #0b0b1a 100%)',
            color: '#fff',
            textAlign: 'center',
            padding: '2rem',
          }}>
          <div style={{fontSize: '2.5rem'}}>👋</div>
          <h1 style={{color: '#fff', margin: 0}}>
            I left you one last thing.
          </h1>
          <p style={{fontSize: '1.1rem', maxWidth: 540, opacity: 0.9}}>
            Before I go — I put together a short farewell message for the team.
            Tap anywhere to play it.
          </p>
          <div
            style={{
              marginTop: '0.25rem',
              padding: '0.8rem 1.5rem',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.25)',
              fontWeight: 600,
            }}>
            ▶ Play my goodbye
          </div>
        </div>
      )}

      <main style={{maxWidth: 760, margin: '0 auto', padding: '2rem 1rem'}}>
        <h1>…and I got you one last time. 🎣</h1>

        {started && (
          <div
            style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: 8,
              margin: '1.5rem 0',
            }}>
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              src={src}
              title="Rick Astley - Never Gonna Give You Up"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        )}

        <p>
          Yep. You clicked a mysterious link from the security person on their
          way out the door… and it was a Rickroll. If I taught you anything,
          let it be this: <strong>always hover before you click.</strong> 😄
        </p>

        <h2>For old times' sake</h2>
        <p>
          You all know the drill — but one more time, because I care:
        </p>
        <ul>
          <li>Check where a link actually goes before you trust it.</li>
          <li>Unexpected + urgent + too-good-to-be-true = probably bait.</li>
          <li>When in doubt, go to the site yourself instead of clicking.</li>
          <li>Report the weird stuff. Someone will always thank you for it.</li>
        </ul>

        <h2>Thank you</h2>
        <p>
          We didn't sit side by side every day, but the monthly meetings and the
          trainings we shared were some of my favourite moments here. Thanks for
          every question that made me think, every discussion that ran long
          because it was actually interesting, and for making this team one I'll
          genuinely miss. Keep learning, keep sharing — and keep hovering before
          you click.
        </p>
        <p style={{opacity: 0.9, marginTop: '2rem'}}>Never gonna give you up,</p>
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            marginTop: '0.5rem',
          }}>
          <img
            src="/img/blu3drag0nsec_raw.jpg"
            alt="blu3"
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span style={{fontWeight: 600, fontSize: '1.1rem'}}>— blu3</span>
        </p>
      </main>
    </Layout>
  );
}
