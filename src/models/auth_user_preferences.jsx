import React from 'react';

class AuthUserPreferences {
  constructor({
    userPreferencesId,
    appTheme,
    userId
  }) {
    this.userPreferencesId = userPreferencesId;
    this.appTheme = appTheme;
    this.userId = userId;
  }

  static fromJsonAuthUserPreferences(json) {
    try {
      return new AuthUserPreferences({
        userPreferencesId: json.user_preferences_id ?? 0,
        appTheme: json.app_theme ?? 'Light Mode',
        userId: json.user_id ?? 0
      });
    } catch (error) {
      console.error('Error parsing AuthUserPreferences from JSON:', error);
      return null; // Or throw the error, depending on your error handling strategy
    }
  }

  toString() {
    return `AuthUserPreferences(user_role: ${this.userRole})`;
  }
}

export default AuthUserPreferences;