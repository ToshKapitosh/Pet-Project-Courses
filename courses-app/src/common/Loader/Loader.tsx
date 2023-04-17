import { InfinitySpin } from 'react-loader-spinner';
import { StyledLoaderWrapper } from './Loader.style';

const Loader = () => {
	return (
		<StyledLoaderWrapper>
			<InfinitySpin width='200' color='#4fa94d' />
		</StyledLoaderWrapper>
	);
};

export default Loader;
