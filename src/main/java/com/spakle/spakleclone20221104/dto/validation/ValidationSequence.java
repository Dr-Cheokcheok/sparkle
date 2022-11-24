package com.spakle.spakleclone20221104.dto.validation;

import javax.validation.GroupSequence;
import javax.validation.groups.Default;

@GroupSequence({Default.class, ValidationGroups.NotBlankGroup.class, ValidationGroups.PatternCheckGroup.class})
public interface ValidationSequence {
}
