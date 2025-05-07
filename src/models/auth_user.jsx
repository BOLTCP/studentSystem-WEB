import React from 'react';

class AuthUser {
  constructor({
    userId,
    loginName,
    passwordHash,
    profilePicture,
    registryNumber,
    familyTreeName,
    fname,
    lname,
    birthday,
    gender,
    citizenship,
    stateCity,
    townDistrict,
    validAddress,
    stateCityLiving,
    townDistrictLiving,
    validAddressLiving,
    postalAddress,
    homePhoneNumber,
    phoneNumber,
    phoneNumberEmergency,
    country,
    ethnicity,
    socialBackground,
    stateCityOfBirth,
    townDistrictOfBirth,
    placeOfBirth,
    education,
    currentAcademicDegree,
    profession,
    professionCertification,
    fPassportNumber,
    married,
    militaryService,
    pensionsEstablished,
    additionalNotes,
    bloodType,
    driversCertificate,
    driversCertificateNumber,
    disabled,
    userRole,
    isActive,
    email,
    createdAt,
  }) {
    this.userId = userId;
    this.loginName = loginName;
    this.passwordHash = passwordHash;
    this.profilePicture = profilePicture;
    this.registryNumber = registryNumber;
    this.familyTreeName = familyTreeName;
    this.fname = fname;
    this.lname = lname;
    this.birthday = birthday ? new Date(birthday) : new Date(); // Handle potential string/Date
    this.gender = gender;
    this.citizenship = citizenship;
    this.stateCity = stateCity;
    this.townDistrict = townDistrict;
    this.validAddress = validAddress;
    this.stateCityLiving = stateCityLiving;
    this.townDistrictLiving = townDistrictLiving;
    this.validAddressLiving = validAddressLiving;
    this.postalAddress = postalAddress || ''; // Default to empty string if null/undefined
    this.homePhoneNumber = homePhoneNumber || ''; // Default to empty string if null/undefined
    this.phoneNumber = phoneNumber;
    this.phoneNumberEmergency = phoneNumberEmergency;
    this.country = country;
    this.ethnicity = ethnicity;
    this.socialBackground = socialBackground;
    this.stateCityOfBirth = stateCityOfBirth;
    this.townDistrictOfBirth = townDistrictOfBirth;
    this.placeOfBirth = placeOfBirth;
    this.education = education;
    this.currentAcademicDegree = currentAcademicDegree;
    this.profession = profession || ''; // Default to empty string if null/undefined
    this.professionCertification = professionCertification || ''; // Default to empty string if null/undefined
    this.fPassportNumber = fPassportNumber || '';
    this.married = married;
    this.militaryService = militaryService;
    this.pensionsEstablished = pensionsEstablished || ''; // Default to empty string if null/undefined
    this.additionalNotes = additionalNotes || ''; // Default to empty string if null/undefined
    this.bloodType = bloodType || ''; // Default to empty string if null/undefined
    this.driversCertificate = driversCertificate;
    this.driversCertificateNumber = driversCertificateNumber;
    this.disabled = disabled;
    this.userRole = userRole;
    this.isActive = isActive ?? true; // Default to true if null/undefined
    this.email = email;
    this.createdAt = createdAt ? new Date(createdAt) : new Date(); // Handle potential string/Date
  }

  // Simulate a fromJson-like static method
  static fromJson(json) {
    try {
      return new AuthUser({
        userId: json.user_id ?? 0,
        loginName: json.login_name ?? '',
        passwordHash: json.password_hash ?? '',
        profilePicture: json.profile_picture ?? '',
        registryNumber: json.registry_number ?? '',
        familyTreeName: json.family_tree_name ?? '',
        fname: json.fname ?? '',
        lname: json.lname ?? '',
        birthday: json.birthday,
        gender: json.gender === 'male' ? 'эрэгтэй' : json.gender === 'female' ? 'эмэгтэй' : 'бусад',
        citizenship: json.citizenship ?? '',
        stateCity: json.state_city ?? '',
        townDistrict: json.town_district ?? '',
        validAddress: json.valid_address ?? '',
        stateCityLiving: json.state_city_living ?? '',
        townDistrictLiving: json.town_district_living ?? '',
        validAddressLiving: json.valid_address_living ?? '',
        postalAddress: json.postal_address,
        homePhoneNumber: json.home_phone_number,
        phoneNumber: json.phone_number ?? '',
        phoneNumberEmergency: json.phone_number_emergency ?? '',
        country: json.country ?? '',
        ethnicity: json.ethnicity ?? '',
        socialBackground: json.social_background ?? '',
        stateCityOfBirth: json.state_city_of_birth ?? '',
        townDistrictOfBirth: json.town_district_of_birth ?? '',
        placeOfBirth: json.place_of_birth ?? '',
        education: json.education ?? '',
        currentAcademicDegree: json.current_academic_degree ?? '',
        profession: json.profession,
        professionCertification: json.profession_certification,
        fPassportNumber: json.f_passport_number,
        married: json.married ?? '',
        militaryService: json.military_service ?? '',
        pensionsEstablished: json.pensions_established,
        additionalNotes: json.additional_notes,
        bloodType: json.blood_type,
        driversCertificate: json.drivers_certificate ?? '',
        driversCertificateNumber: json.drivers_certificate_number ?? '',
        disabled: json.disabled ?? '',
        userRole: json.user_role === 'student' ? 'Сурагч' : json.user_role === 'teacher' ? 'Багш' : '',
        isActive: json.is_active,
        email: json.email ?? '',
        createdAt: json.created_at,
      });
    } catch (error) {
      console.error('Error parsing AuthUser from JSON:', error);
      return null; // Or throw the error, depending on your error handling strategy
    }
  }

  static toJson(authUser) {
    return {
      user_id: authUser.userId,
      login_name: authUser.loginName,
      password_hash: authUser.passwordHash,
      profile_picture: authUser.profilePicture,
      registry_number: authUser.registryNumber,
      family_tree_name: authUser.familyTreeName,
      fname: authUser.fname,
      lname: authUser.lname,
      birthday: authUser.birthday ? authUser.birthday.toISOString() : null, // Convert Date to ISO string
      gender: authUser.gender === 'эрэгтэй' ? 'male' : authUser.gender === 'эмэгтэй' ? 'female' : 'other',
      citizenship: authUser.citizenship,
      state_city: authUser.stateCity,
      town_district: authUser.townDistrict,
      valid_address: authUser.validAddress,
      state_city_living: authUser.stateCityLiving,
      town_district_living: authUser.townDistrictLiving,
      valid_address_living: authUser.validAddressLiving,
      postal_address: authUser.postalAddress,
      home_phone_number: authUser.homePhoneNumber,
      phone_number: authUser.phoneNumber,
      phone_number_emergency: authUser.phoneNumberEmergency,
      country: authUser.country,
      ethnicity: authUser.ethnicity,
      social_background: authUser.socialBackground,
      state_city_of_birth: authUser.stateCityOfBirth,
      town_district_of_birth: authUser.townDistrictOfBirth,
      place_of_birth: authUser.placeOfBirth,
      education: authUser.education,
      current_academic_degree: authUser.currentAcademicDegree,
      profession: authUser.profession,
      profession_certification: authUser.professionCertification,
      f_passport_number: authUser.fPassportNumber,
      married: authUser.married,
      military_service: authUser.militaryService,
      pensions_established: authUser.pensionsEstablished,
      additional_notes: authUser.additionalNotes,
      blood_type: authUser.bloodType,
      drivers_certificate: authUser.driversCertificate,
      drivers_certificate_number: authUser.driversCertificateNumber,
      disabled: authUser.disabled,
      user_role: authUser.userRole === 'Сурагч' ? 'student' : authUser.userRole === 'Багш' ? 'teacher' : '',
      is_active: authUser.isActive,
      email: authUser.email,
      created_at: authUser.createdAt ? authUser.createdAt.toISOString() : null, // Convert Date to ISO string
    };
  }

  static fromJsonButInApp(json) {
    try {
      return new AuthUser({
        userId: json.userId ?? 0,
        loginName: json.loginName ?? '',
        passwordHash: json.passwordHash ?? '',
        profilePicture: json.profilePicture ?? '',
        registryNumber: json.registryNumber ?? '',
        familyTreeName: json.familyTreeName ?? '',
        fname: json.fname ?? '',
        lname: json.lname ?? '',
        birthday: json.birthday ? new Date(json.birthday) : null, // Convert ISO string back to Date
        gender: json.gender ?? '',
        citizenship: json.citizenship ?? '',
        stateCity: json.stateCity ?? '',
        townDistrict: json.townDistrict ?? '',
        validAddress: json.validAddress ?? '',
        stateCityLiving: json.stateCityLiving ?? '',
        townDistrictLiving: json.townDistrictLiving ?? '',
        validAddressLiving: json.validAddressLiving ?? '',
        postalAddress: json.postalAddress ?? '',
        homePhoneNumber: json.homePhoneNumber ?? '',
        phoneNumber: json.phoneNumber ?? '',
        phoneNumberEmergency: json.phoneNumberEmergency ?? '',
        country: json.country ?? '',
        ethnicity: json.ethnicity ?? '',
        socialBackground: json.socialBackground ?? '',
        stateCityOfBirth: json.stateCityOfBirth ?? '',
        townDistrictOfBirth: json.townDistrictOfBirth ?? '',
        placeOfBirth: json.placeOfBirth ?? '',
        education: json.education ?? '',
        currentAcademicDegree: json.currentAcademicDegree ?? '',
        profession: json.profession ?? '',
        professionCertification: json.professionCertification ?? '',
        fPassportNumber: json.fPassportNumber ?? '',
        married: json.married ?? '',
        militaryService: json.militaryService ?? '',
        pensionsEstablished: json.pensionsEstablished ?? '',
        additionalNotes: json.additionalNotes ?? '',
        bloodType: json.bloodType ?? '',
        driversCertificate: json.driversCertificate ?? '',
        driversCertificateNumber: json.driversCertificateNumber ?? '',
        disabled: json.disabled ?? '',
        userRole: json.userRole ?? '',
        isActive: json.isActive ?? true,
        email: json.email ?? '',
        createdAt: json.createdAt ? new Date(json.createdAt) : null, // Convert ISO string back to Date
      });
    } catch (error) {
      console.error('Error parsing AuthUser from JSON string:', error);
      return null; // Handle errors gracefully
    }
  }

  toString() {
    return `AuthUser(userId: ${this.userId}, loginName: ${this.loginName}, userRole: ${this.userRole}, isActive: ${this.isActive})`;
  }
}

export default AuthUser;