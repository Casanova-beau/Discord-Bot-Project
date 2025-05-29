module.exports = (existingCommand, localCommand) => {
  const areChoicesDifferent = (existingChoices = [], localChoices = []) => {
    if (existingChoices.length !== localChoices.length) return true;

    for (const localChoice of localChoices) {
      const existingChoice = existingChoices.find(
        (choice) => choice.name === localChoice.name
      );
      if (!existingChoice || localChoice.value !== existingChoice.value) {
        return true;
      }
    }
    // Check for extra choices in existing that are not in local
    for (const existingChoice of existingChoices) {
      const localChoice = localChoices.find(
        (choice) => choice.name === existingChoice.name
      );
      if (!localChoice) return true;
    }
    return false;
  };

  const areOptionsDifferent = (existingOptions = [], localOptions = []) => {
    if (existingOptions.length !== localOptions.length) return true;

    for (const localOption of localOptions) {
      const existingOption = existingOptions.find(
        (option) => option.name === localOption.name
      );
      if (!existingOption) return true;

      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !==
          (existingOption.required || false) ||
        areChoicesDifferent(
          existingOption.choices || [],
          localOption.choices || []
        )
      ) {
        return true;
      }
    }
    // Check for extra options in existing that are not in local
    for (const existingOption of existingOptions) {
      const localOption = localOptions.find(
        (option) => option.name === existingOption.name
      );
      if (!localOption) return true;
    }
    return false;
  };

  if (
    existingCommand.description !== localCommand.description ||
    areOptionsDifferent(
      existingCommand.options || [],
      localCommand.options || []
    )
  ) {
    return true;
  }

  return false;
};
