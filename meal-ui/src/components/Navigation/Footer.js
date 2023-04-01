import { faGithub } from '@fortawesome/free-brands-svg-icons';
import config from 'config';
import VersionInfo from 'VersionInfo';
import { IconButton } from 'components/Button';

export default function Footer({ className }) {
	return (
		<footer
			className={
				className
					? `hero-footer footer-grid ${className}`
					: `hero-footer footer-grid`
			}
		>
			<div className='footer-content'>
				<IconButton
					faIcon={faGithub}
					onClick={() => window.open(config.GitSocialLink, '_blank')}
				/>
				release: {VersionInfo.toString()}
			</div>
		</footer>
	);
}
