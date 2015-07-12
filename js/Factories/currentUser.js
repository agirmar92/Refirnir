/* Constants */
myApp.service('currentUser',
	function() {
		// TODO: eftir ad sorta ut hvad hver user hefur
		this.token = '';
		this.userName = 'Ægir Már Jónsson';
		this.fullName = '';
		this.role = '';
		this.ssn = '';
		this.imageURL = '';
		return this;
	}
);