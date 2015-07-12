/* Constants */
myApp.service('currentUser',
	function() {
		// TODO: eftir ad sorta ut hvad hver user hefur
		this.loggedIn = false;
		this.ID = '';
		this.userName = '';
		this.role = '';
		this.ssn = '';
		this.imageURL = '';
		return this;
	}
);