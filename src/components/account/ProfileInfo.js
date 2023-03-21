import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

export const ProfileInfo = ({ setVisibleLoading, setTextLoading }) => {
	const { uid, photoURL, displayName, email } = getAuth().currentUser;
	const [photo, setPhoto] = useState(photoURL);

	const changePhoto = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [3, 4],
		});

		if (!result.cancelled) uploadPhoto(result.uri);
	};

	const uploadPhoto = async (uri) => {
		setTextLoading('Cargando foto...');
		setVisibleLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();
		const storageRef = ref(getStorage(), `imgProfile/${uid}`);
		uploadBytes(storageRef, blob).then((snapshot) => {
			updatePhoto(snapshot.metadata.fullPath);
		});
		const url = await getDownloadURL(storageRef);
		updateProfile(getAuth().currentUser, { photoURL: url });
	};

	const updatePhoto = async (imgPath) => {
		setTextLoading('Actualizando foto...');
		const storage = getStorage();
		const refImg = ref(storage, imgPath);
		const url = await getDownloadURL(refImg);
		updateProfile(auth.currentUser, { photoURL: url });
		setPhoto(url);
		setVisibleLoading(false);
	};

	return (
		<View style={styles.viewPhoto}>
			<Avatar
				size='large'
				rounded={true}
				icon={{ type: 'material', name: 'person' }}
				containerStyle={styles.avatar}
				source={{ uri: photo }}
			>
				<Avatar.Accessory size={25} onPress={changePhoto} />
			</Avatar>
			<View>
				<Text style={styles.nameUser}>{displayName || 'USUARIO'}</Text>
				<Text>{email}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	viewPhoto: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 30,
		backgroundColor: '#f2f2f2',
	},
	avatar: {
		marginRight: 20,
		backgroundColor: '#0D5BD7',
	},
	nameUser: {
		fontWeight: 'bold',
		paddingBottom: 5,
	},
});
