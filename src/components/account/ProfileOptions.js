import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { map } from 'lodash';
import { Modal } from '../common/Modal';
import { useState } from 'react';
import { ChangeNameForm } from './ChangeNameForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { ChangeEmailForm } from './ChangeEmailForm';

export const ProfileOptions = ({ onReload }) => {
	const [showModal, setShowModal] = useState(false);
	const [conteined, setConteined] = useState(null);

	const onClose = () => {
		setShowModal((prevState) => !prevState);
	};

	const selectComponent = (key) => {
		if (key === 'displayName') {
			setConteined(
				<ChangeNameForm close={onClose} onReload={onReload} />
			);
		}

		if (key === 'password') {
			setConteined(<ChangePasswordForm close={onClose} />);
		}

		if (key === 'email') {
			setConteined(
				<ChangeEmailForm close={onClose} onReload={onReload} />
			);
		}

		onClose();
	};

	const optionsMenu = getOptionsMenu(selectComponent);

	return (
		<View>
			{map(optionsMenu, (menu, index) => (
				<ListItem key={index} onPress={menu.onPress}>
					<Icon
						type={menu.typeIcon}
						name={menu.iconLeft}
						color={menu.colorIcon}
					/>
					<ListItem.Content>
						<ListItem.Title>{menu.title}</ListItem.Title>
					</ListItem.Content>
					<Icon
						type={menu.typeIcon}
						name='chevron-right'
						color={menu.colorIcon}
					/>
				</ListItem>
			))}
			<Modal visible={showModal} close={onClose}>
				{conteined}
			</Modal>
		</View>
	);
};

const getOptionsMenu = (selectComponent) => {
	return [
		{
			title: 'Cambiar nombre',
			typeIcon: 'material-community',
			nameIconLeft: 'account-circle',
			colorIcon: '#ccc',
			nameIconRight: 'chevron-right',
			onPress: () => selectComponent('displayName'),
		},
		{
			title: 'Cambiar contraseña',
			typeIcon: 'material-community',
			nameIconLeft: 'lock-reset',
			colorIcon: '#ccc',
			nameIconRight: 'chevron-right',
			onPress: () => selectComponent('password'),
		},
		{
			title: 'Cambiar email',
			typeIcon: 'material-community',
			nameIconLeft: 'at',
			colorIcon: '#ccc',
			nameIconRight: 'chevron-right',
			onPress: () => selectComponent('email'),
		},
	];
};

const styles = StyleSheet.create({});
