import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

export const Loading = ({ visible, text }) => {
	return (
		<Overlay overlayStyle={styles.overlay} isVisible={visible}>
			<View style={styles.viewLoad}>
				<ActivityIndicator size='large' color='#0D5BD7' />
				{text && <Text style={styles.text}>{text}</Text>}
			</View>
		</Overlay>
	);
};

Loading.defaultProps = {
	visible: false,
	text: null,
};

const styles = StyleSheet.create({
	overlay: {
		height: 100,
		width: 200,
		backgroundColor: '#fff',
		borderColor: '#0D5BD7',
		borderWidth: 2,
		borderRadius: 8,
	},
	viewLoad: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: '#0D5BD7',
		textTransform: 'uppercase',
	},
});
