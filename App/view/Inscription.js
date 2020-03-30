import React, {Component} from 'react'
import { TextInput, View, StyleSheet, KeyboardAvoidingView, ImageBackground, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Text, Icon, Badge } from 'react-native-elements'
import { Formik } from 'formik'
import * as yup from 'yup'
import DatePicker from 'react-native-datepicker'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert'
import { Ionicons } from '@expo/vector-icons'
import config from '../config/config';




export class Inscription extends Component {

	constructor(props) {

		super(props)

		this.state = {
			date: "",
			show: false,
			showError: false,
			showErrorEmail: false,
			loading: false,
			user: '',
			emailCheck: ''
		}
	}

	async emailCheck(values) {

		this.setState({loading: true})

		fetch(`/users/check/`+ values.email, {

			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(async resp => {
			if (resp.status === 302) {
				return resp.json()
			}
		})
		.then(responseData => {
			if (responseData) {
				this.setState({emailCheck: responseData.email})
			}
			this.registerCall(values)
		})
		.catch(err => {
			console.log(err)
		})
	}

	async registerCall(values) {

		let { emailCheck } = this.state
		let check

		if (emailCheck === values.email) {
			check = false
		} else {
			check = true
		}

		if (check === false) {
			this.setState({showErrorEmail: true})
			this.setState({loading: false})
			return false
		}

		fetch(``+config.API_URL+`/signup`, {

			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"firstname": values.prenom,
				"lastname": values.nom,
				"email": values.email,
				"birthDate": values.birthDate,
				"weight": parseInt(values.poids),
				"password": values.password,
			})

		}).then((response) => {

			let json = response.json();

			if (response.status >= 200 && response.status < 300) {
				return json;
			} else {
				return json.then(Promise.reject.bind(Promise, 500));
			}

		})
			.then((data) => {

				if (data) {
					this.setState({loading: false})
					this.setState({user: data.firstname})
					this.setState({ show:true })
					setTimeout(() => {
						// this.setState({ show:false })
						this.props.navigation.navigate('SignIn');
					}, 2000)
				}
			})
			.catch(err => {
				console.log(err)
				this.setState({showError: true})
			})
	}

	handleClose = () => {
		this.setState({ show: false })
		this.setState({ showError: false })
		this.setState({ showErrorEmail: false })
	}

	render() {

		const validationSchema = yup.object().shape({

			email: yup.string()
				.label('Email')
				.strict()
				.lowercase('Majuscules non valides')
				.email('Veuillez entrer un email valide')
				.ensure()
				.required('Champ obligatoire'),

			password: yup.string()
				.label('Password')
				.required('Champ obligatoire')
				.min(6, 'Minimum 6 caractères')
				.matches(/^\S+$/, 'Espaces non autorisés'),

			passwordVerify: yup.string()
				.label('Password verify')
				.required('Champ obligatoire')
				.matches(/^\S+$/, 'Espaces non autorisés')
				.oneOf([yup.ref('password'), null], 'La vérification a échouée'),

			prenom: yup.string()
				.label('Prénom')
				.required('Champ obligatoire')
				.min(2, 'Minimum 2 caractères')
				.max(20, 'Maximum 20 caractères')
				.trim()
				.matches(/^[a-zA-Z]*$/, 'Caractères invalides'),

			nom: yup.string()
				.label('Nom')
				.required('Champ obligatoire')
				.min(2, 'Minimum 2 caractères')
				.max(20, 'Maximum 20 caractères')
				.trim()
				.matches(/^[a-zA-Z]*$/, 'Caractères invalides'),

			birthDate: yup.string()
				.label('Date de naissance')
				.required('Champ obligatoire'),

			poids: yup.string()
				.label('Poids')
				.required('Champ obligatoire')
				.matches(/^[0-9]*\.?[0-9]{1,2}$/, 'Caractères invalides')
				.typeError('Caractère invalide'),
		})


		return (

			<KeyboardAvoidingView
				contentContainerStyle={styles.keyboard}
				behavior={"height"}
				keyboardVerticalOffset={-40}
			>

				{/* Modal : Inscription réussit */}

				<View style={{
					backgroundColor: '#fff',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20
				}}>

					<SCLAlert
						show={this.state.show}
						onRequestClose={this.handleClose}
						theme="info"
						title={"Félicitations" + ' ' + this.state.user}
						subtitle="Vous avez été inscrit avec succès !"
						headerIconComponent={<Ionicons name="ios-checkmark" size={70} color="white"/>}
						overlayStyle={{backgroundColor: 'white'}}
						titleStyle={{fontSize: 30}}
						subtitleStyle={{fontSize: 18}}
					/>

				</View>

				{/* Modal : Erreur 500 */}

				<View style={{
					backgroundColor: '#fff',
					alignItems: 'center',
					justifyContent: 'center'
				}}>

					<SCLAlert
						show={this.state.showError}
						onRequestClose={this.handleClose}
						theme="danger"
						title="Erreur"
						subtitle="Un problème est survenu sur le serveur, veuillez réessayer !"
						headerIconComponent={<Ionicons name="ios-alert" size={90} color="white" />}
						titleStyle={{ fontSize: 30 }}
						subtitleStyle={{ fontSize: 18}}
					>

						<SCLAlertButton theme="danger" onPress={this.handleClose}>Réessayer</SCLAlertButton>

					</SCLAlert>

				</View>

				{/* Modal : Adresse email déjà existant */}

				<View style={{
					backgroundColor: '#fff',
					alignItems: 'center',
					justifyContent: 'center'
				}}>

					<SCLAlert
						show={this.state.showErrorEmail}
						onRequestClose={this.handleClose}
						theme="danger"
						title="Erreur"
						subtitle="L' addresse email que vous avez entré existe déjà !"
						headerIconComponent={<Ionicons name="ios-alert" size={90} color="white" />}
						titleStyle={{ fontSize: 30 }}
						subtitleStyle={{ fontSize: 18}}
					>

						<SCLAlertButton theme="danger" onPress={this.handleClose}>Retour</SCLAlertButton>

					</SCLAlert>

				</View>

				{/* Page Inscription */}

				<ScrollView>

					<View style={styles.view}>

						{ /* HEADER */ }

						<ImageBackground
							source={require('../assets/img/Inscription.png')}
							style={styles.headerLogo}
						>

							<Text style={styles.headerText}>Inscription</Text>

						</ImageBackground>

						{ /* REGISTRATION FORM */ }

						<Formik

							initialValues={{
								email: '',
								prenom: '',
								nom: '',
								password: '',
								passwordVerify: '',
								birthDate: '',
								poids: '',
							}}

							onSubmit={values => this.emailCheck(values)}
							validationSchema={validationSchema}
						>

							{({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (

								<View style={styles.view}>

									<View>

										{ /* FIRSTNAME INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>
											{errors.prenom && touched.prenom ?
												<TextInput
													style={styles.textInputError }
													value={values.prenom}
													onChangeText={handleChange('prenom')}
													onBlur={handleBlur('prenom')}
													placeholder={'Prénom'}
												/>
												:
												<TextInput
													style={styles.textInput}
													value={values.prenom}
													onChangeText={handleChange('prenom')}
													onBlur={handleBlur('prenom')}
													placeholder={'Prénom'}
												/>
											}

											<Icon
												name='user'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 15, top: -10}}
											/>

										</View>


										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.prenom && touched.prenom ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.prenom && touched.prenom ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.prenom}</Text> : null}

										</View>


										{ /* LASTNAME INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>


											{errors.nom && touched.nom ?
												<TextInput
													style={styles.textInputError}
													onChangeText={handleChange('nom')}
													onBlur={handleBlur('nom')}
													placeholder={'Nom'}
												/>
												:
												<TextInput
													style={styles.textInput}
													onChangeText={handleChange('nom')}
													onBlur={handleBlur('nom')}
													placeholder={'Nom'}
												/>
											}

											<Icon
												name='user'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 15, top: -10}}
											/>

										</View>

										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.nom && touched.nom ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.nom && touched.nom ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.nom}</Text> : null}

										</View>

										{ /* EMAIL INPUT AND ERROR TEXT */ }

										<View style={styles.inputSection}>

											{errors.email && touched.email ?
												<TextInput
													style={styles.textInputError}
													onChangeText={handleChange('email')}
													onBlur={handleBlur('email')}
													placeholder={'Adresse email'}
												/>
												:
												<TextInput
													style={styles.textInput}
													onChangeText={handleChange('email')}
													onBlur={handleBlur('email')}
													placeholder={'Adresse email'}
												/>
											}

											<Icon
												name='envelope-open'
												type='font-awesome'
												color='#2C5077'
												size={20}
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 14, top: -8}}
											/>

										</View>

										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.email && touched.email ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.email && touched.email ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.email}</Text> : null}

										</View>

										{ /* PASSWORD AND PASSWORD CHECK INPUT AND ERROR TEXT */ }


										<View style={styles.inputSection}>

											{errors.password && touched.password || errors.passwordVerify && touched.passwordVerify?
												<TextInput
													style={styles.textInputError}
													onChangeText={handleChange('password')}
													onBlur={handleBlur('password')}
													type={'password'}
													placeholder={'Mot de passe'}
													secureTextEntry
												/>
												:
												<TextInput
													style={styles.textInput}
													onChangeText={handleChange('password')}
													onBlur={handleBlur('password')}
													type={'password'}
													placeholder={'Mot de passe'}
													secureTextEntry
												/>
											}

											<Icon
												name='lock'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 16, top: -8}}
											/>

										</View>

										<View style={{ display: 'flex', flex:1, flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.password && touched.password ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.password && touched.password ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.password}</Text> : null}

										</View>

										<View style={styles.inputSection}>

											{errors.passwordVerify && touched.passwordVerify ?
												<TextInput
													style={styles.textInputError}
													onChangeText={handleChange('passwordVerify')}
													onBlur={handleBlur('passwordVerify')}
													type={'password'}
													placeholder={'Retapez le mot de passe'}
													secureTextEntry
												/>
												:
												<TextInput
													style={styles.textInput}
													onChangeText={handleChange('passwordVerify')}
													onBlur={handleBlur('passwordVerify')}
													type={'password'}
													placeholder={'Retapez le mot de passe'}
													secureTextEntry
												/>
											}

											<Icon
												name='lock'
												type='font-awesome'
												color='brown'
												style={styles.searchIcon}
												iconStyle={{ position: 'absolute', right: 16, top: -8}}
											/>

										</View>

										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.passwordVerify && touched.passwordVerify ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.passwordVerify && touched.passwordVerify ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.passwordVerify}</Text> : null}

										</View>


										{ /* DATE INPUT AND ERROR TEXT */ }

										{errors.birthDate && touched.birthDate ?

											<DatePicker
												style={{ width: 280, marginTop: 5 }}
												date={this.state.date}
												mode="date"
												placeholder="Date de naissance"
												format="YYYY/MM/DD"
												minDate="1940/01/01"
												confirmBtnText="Confirm"
												cancelBtnText="Cancel"
												iconComponent={
													<Icon
														name='calendar'
														type='font-awesome'
														color='#2C5077'
														size={21}
														iconStyle={{
															position: 'absolute',
															right: 14,
														}}
													/>
												}
												customStyles={{
													dateInput: {
														borderRadius: 5,
														borderColor: 'brown',
														height: 44
													},
													dateText: {
														fontSize: 17
													},
													placeholderText: {
														fontSize: 17,
														textAlign: 'left',
														alignSelf: 'stretch',
														paddingLeft: 16
													}
												}}
												onDateChange={(birthDate) => {
													this.setState({date: birthDate})
													values.birthDate = birthDate
												}}
											/>
											:
											<DatePicker
												style={{ width: 280, marginTop: 5 }}
												date={this.state.date}
												mode="date"
												placeholder="Date de naissance"
												format="YYYY/MM/DD"
												minDate="1940/01/01"
												confirmBtnText="Confirm"
												cancelBtnText="Cancel"
												iconComponent={
													<Icon
														name='calendar'
														type='font-awesome'
														color='#2C5077'
														size={21}
														iconStyle={{
															position: 'absolute',
															right: 14,
														}}
													/>
												}
												customStyles={{
													dateInput: {
														borderRadius: 5,
														borderColor: '#989898',
														height: 44
													},
													dateText: {
														fontSize: 17
													},
													placeholderText: {
														fontSize: 17,
														textAlign: 'left',
														alignSelf: 'stretch',
														paddingLeft: 16
													}
												}}
												onDateChange={(birthDate) => {
													this.setState({date: birthDate})
													values.birthDate = birthDate
												}}
											/>
										}

										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.birthDate && touched.birthDate ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.birthDate && touched.birthDate ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.birthDate}</Text> : null}

										</View>

										{ /* WEIGHT INPUT */ }

										<View style={styles.inputSection}>

											<TextInput
												keyboardType={'phone-pad'}
												style={styles.textInput}
												onChangeText={handleChange('poids')}
												onBlur={handleBlur('poids')}
												placeholder={'Poids (kg)'}
											/>

											<Icon
												name='balance-scale'
												type='font-awesome'
												color='#2C5077'
												style={styles.searchIcon}
												size={20}
												iconStyle={{ position: 'absolute', right: 10, top: -8}}
											/>

										</View>

										<View style={{ display: 'flex', flexDirection: "row", marginBottom: 5, marginTop: 10 }}>

											{errors.poids && touched.poids ? <Badge value="Erreur" status="error" textStyle={{ marginBottom: 2, fontWeight: "bold" }} badgeStyle={{backgroundColor: 'brown', padding: 5}} /> : null}
											{errors.poids && touched.poids ? <Text style={{color: 'brown', marginLeft: 8, marginTop: -1}}>{errors.poids}</Text> : null}

										</View>

										<View style={{alignItems: "center"}}>
											<Button
												buttonStyle={{
													backgroundColor: '#2C5077',
													width: 200,
													height: 50,
													marginBottom: 40,
													marginTop: 20
												}}
												title="Inscription"
												color="#2C5077"
												type="solid"
												onPress={handleSubmit}
											/>
										</View>

									</View>

								</View>
							)}
						</Formik>
						<View style={{ flex : 1 }} />
					</View>
				</ScrollView>

				<View style={[(this.state.loading) ? styles.loading : '']}>
					<ActivityIndicator size={50} color="brown" animating={this.state.loading}/>
				</View>

			</KeyboardAvoidingView>
		)
	}
}

const styles = StyleSheet.create({

	view: {

		alignItems: 'center',
		flex: 1,
	},

	textInput: {

		width: 280,
		marginTop: 5,
		alignItems: 'center',
		alignSelf: 'stretch',
		paddingVertical: 7,
		paddingLeft: 16,
		borderColor: '#989898',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 17
	},

	textInputError: {

		width: 280,
		marginTop: 5,
		alignItems: 'center',
		alignSelf: 'stretch',
		paddingVertical: 7,
		paddingLeft: 16,
		borderColor: 'brown',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: 17
	},

	keyboard: {

		marginBottom: 0
	},

	headerLogo: {

		height: 60,
		width: 240,
		position: 'relative',
		top: 2,
		left: 2,
		marginTop: 24,
		marginBottom: 30
	},

	headerText: {

		fontSize: 20,
		color: 'white',
		top: 13,
		left: 0,
		textAlign: 'center'
	},

	inputSection: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},

	loading: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255, 0.8)',

	}

})


export default Inscription

