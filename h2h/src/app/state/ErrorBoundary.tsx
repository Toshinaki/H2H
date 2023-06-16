import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";

// interface ErrorBoundaryState {
//   hasError: boolean;
//   errorMessage: string;
// }
interface ErrorboundaryProps extends WithTranslation {
  children: React.ReactNode;
}

class ErrorBoundaries extends React.Component<ErrorboundaryProps> {
  constructor(props: ErrorboundaryProps) {
    super(props);
    // this.state = {
    //   hasError: false,
    //   errorMessage: "",
    // };
  }
  componentDidCatch(error: Error) {
    notifications.show({
      message: this.props.t(error.message),
    });
  }
  render(): React.ReactNode {
    // if (this.state?.hasError) {
    //   return (
    //     <div className="divClass">
    //       <p>
    //         <h3>ErrorBoundaries</h3>
    //       </p>
    //       {this.state.errorMessage}
    //     </div>
    //   );
    // }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundaries);
