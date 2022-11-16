package com.spakle.spakleclone20221104.dto.validation;

import javax.validation.GroupSequence;
import javax.validation.groups.Default;

@GroupSequence({
        ValidationGroups.NotBlankGroup.class,
        ValidationGroups.SizeCheckGroup.class,
        ValidationGroups.PatternCheckGroup.class,
        Default.class
})

public interface ValidationSequence {
}
