import { Settings } from "lucide-react";

export default function GeneralSection({ colors }) {
  return (
    <div>
      <Header
        icon={<Settings size={24} color={colors.green} />}
        title="General Info"
        colors={colors}
      />

      <p style={textStyle(colors)}>
        Configure your account preferences and general settings.
      </p>
    </div>
  );
}
